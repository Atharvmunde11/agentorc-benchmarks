/**
 * Shared harness for Agent ORC benchmarks.
 */

import { mkdirSync, rmSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { cpus, totalmem } from "node:os";
import { AgentOrc } from "agentorc";
import type { InitOptions } from "agentorc";
import { config as loadDotenv } from "dotenv";
import type {
  BenchContext,
  BenchmarkResultRow,
  BenchmarkSection,
  MetricValue,
} from "./types.ts";
import { resolveAdapter, assertAdapterSupported } from "./adapters.ts";
import { formatMs } from "./format.ts";
import { generateMemories, type GeneratedMemory } from "../generator.ts";
import { installMockFetch, startMockOpenAIServer } from "./mock.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
loadDotenv({ path: join(ROOT, ".env") });

export function metric(
  name: string,
  value: number | null,
  display: string,
  unit?: string,
): MetricValue {
  return { name, value, display, unit };
}

export function row(
  partial: Omit<BenchmarkResultRow, "metrics"> & { metrics?: MetricValue[] },
): BenchmarkResultRow {
  return { ...partial, metrics: partial.metrics ?? [] };
}

export async function timed<T>(
  fn: () => Promise<T>,
): Promise<{ result: T; ms: number }> {
  const start = performance.now();
  const result = await fn();
  return { result, ms: performance.now() - start };
}

export function dbPathFor(ctx: BenchContext, name: string): string {
  return join(ctx.dataDir, `${name}.db`);
}

export function ensureCleanDb(path: string): void {
  for (const suffix of ["", "-wal", "-shm"]) {
    const p = `${path}${suffix}`;
    if (existsSync(p)) rmSync(p, { force: true });
  }
  mkdirSync(dirname(path), { recursive: true });
}

export function fileSizeBytes(path: string): number {
  if (!existsSync(path)) return 0;
  let total = statSync(path).size;
  for (const suffix of ["-wal", "-shm"]) {
    const side = `${path}${suffix}`;
    if (existsSync(side)) total += statSync(side).size;
  }
  return total;
}

export function memorySnapshot() {
  const m = process.memoryUsage();
  return {
    rss: m.rss,
    heapTotal: m.heapTotal,
    heapUsed: m.heapUsed,
    external: m.external,
    arrayBuffers: m.arrayBuffers,
  };
}

export function createInitOptions(
  ctx: BenchContext,
  connectionString: string,
): InitOptions {
  assertAdapterSupported(ctx.adapter);
  return {
    organization: ctx.organization,
    database: { provider: "sqlite", connectionString },
    embedding: {
      baseUrl: ctx.embedding.baseUrl,
      apiKey: ctx.embedding.apiKey,
      model: ctx.embedding.model,
      timeoutMs: 120_000,
    },
    llm: {
      baseUrl: ctx.llm.baseUrl,
      apiKey: ctx.llm.apiKey,
      model: ctx.llm.model,
      temperature: ctx.llm.temperature,
      maxTokens: ctx.llm.maxTokens,
      timeoutMs: 180_000,
    },
  };
}

export async function createClient(
  ctx: BenchContext,
  connectionString: string,
): Promise<AgentOrc> {
  const client = new AgentOrc();
  await client.init(createInitOptions(ctx, connectionString));
  return client;
}

export async function populateDataset(
  client: AgentOrc,
  count: number,
  options?: { startSeed?: number; agentOverride?: string },
): Promise<GeneratedMemory[]> {
  const memories = generateMemories(count, options?.startSeed ?? 1);
  for (const memory of memories) {
    await client.remember({
      agent: options?.agentOverride ?? memory.agent,
      content: { text: memory.text },
      metadata: memory.metadata,
    });
  }
  return memories;
}

export function insertSizes(scale: BenchContext["scale"]): number[] {
  return scale === "quick" ? [100, 1_000] : [100, 1_000, 10_000, 100_000];
}

export function retrievalSizes(scale: BenchContext["scale"]): number[] {
  return scale === "quick" ? [1_000] : [1_000, 10_000, 100_000];
}

export function concurrencyLevels(scale: BenchContext["scale"]): number[] {
  return scale === "quick" ? [10, 50] : [10, 50, 100];
}

export function resolveCliArgs(argv = process.argv.slice(2)) {
  const quick = argv.includes("--quick") || process.env.BENCH_SCALE === "quick";
  const live =
    argv.includes("--live") ||
    process.env.BENCH_MODE === "live" ||
    process.env.BENCH_USE_LIVE === "1";
  const reportOnly = argv.includes("--report-only");
  return {
    mode: live ? ("live" as const) : ("mock" as const),
    scale: quick ? ("quick" as const) : ("full" as const),
    reportOnly,
  };
}

export async function buildContext(
  mode: BenchContext["mode"],
  scale: BenchContext["scale"],
): Promise<{ ctx: BenchContext; cleanup: () => Promise<void> }> {
  const adapter = resolveAdapter();
  assertAdapterSupported(adapter);

  const dataDir = join(ROOT, "data");
  const resultsDir = join(ROOT, "results");
  const chartsDir = join(resultsDir, "charts");
  mkdirSync(dataDir, { recursive: true });
  mkdirSync(chartsDir, { recursive: true });

  let mockClose: (() => Promise<void>) | null = null;
  let embeddingBase =
    process.env.EMBEDDING_BASE_URL ??
    process.env.OPENAI_BASE_URL ??
    "https://api.openai.com/v1";
  let embeddingKey =
    process.env.EMBEDDING_API_KEY ?? process.env.OPENAI_API_KEY ?? "bench-key";
  let embeddingModel = process.env.EMBEDDING_MODEL ?? "text-embedding-3-small";
  let llmBase =
    process.env.LLM_BASE_URL ?? process.env.OPENAI_BASE_URL ?? embeddingBase;
  let llmKey =
    process.env.LLM_API_KEY ?? process.env.OPENAI_API_KEY ?? embeddingKey;
  let llmModel = process.env.LLM_MODEL ?? "gpt-4.1-mini";
  let dimensions = Number(process.env.EMBEDDING_DIMS ?? 384);

  if (mode === "mock") {
    const mock =
      process.env.BENCH_MOCK_HTTP === "1"
        ? await startMockOpenAIServer(dimensions)
        : installMockFetch(dimensions);
    mockClose = mock.close;
    embeddingBase = mock.baseUrl;
    llmBase = mock.baseUrl;
    embeddingKey = "mock-key";
    llmKey = "mock-key";
    embeddingModel = "mock-embed";
    llmModel = "mock-llm";
  } else if (!process.env.OPENAI_API_KEY && !process.env.EMBEDDING_API_KEY) {
    throw new Error(
      "Live mode requires OPENAI_API_KEY or EMBEDDING_API_KEY in .env",
    );
  }

  const ctx: BenchContext = {
    mode,
    scale,
    adapter,
    dataDir,
    resultsDir,
    chartsDir,
    organization: process.env.ORGANIZATION ?? "benchmark-org",
    embedding: {
      baseUrl: embeddingBase,
      apiKey: embeddingKey,
      model: embeddingModel,
      dimensions,
    },
    llm: {
      baseUrl: llmBase,
      apiKey: llmKey,
      model: llmModel,
      temperature: Number(process.env.LLM_TEMPERATURE ?? 0.2),
      maxTokens: Number(process.env.LLM_MAX_TOKENS ?? 1024),
    },
  };

  return {
    ctx,
    cleanup: async () => {
      if (mockClose) await mockClose();
    },
  };
}

export function runtimeInfo() {
  return {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    cpus: cpus().length,
    totalMemBytes: totalmem(),
  };
}

export async function sectionWrapper(
  id: string,
  title: string,
  meta: { what: string; why: string; how: string },
  run: () => Promise<{ rows: BenchmarkResultRow[] }>,
): Promise<BenchmarkSection> {
  const start = performance.now();
  console.log(`\n▶ ${title}`);
  const { rows } = await run();
  const durationMs = performance.now() - start;
  console.log(
    `  ✓ ${title} finished in ${formatMs(durationMs)} (${rows.length} rows)`,
  );
  return { id, title, ...meta, rows, durationMs };
}

export function tinybenchStats(task: {
  result?: {
    state?: string;
    latency?: {
      mean: number;
      p75: number;
      p99: number;
      rme: number;
      samplesCount: number;
    };
    throughput?: { mean: number };
    period?: number;
  };
} | undefined) {
  const result = task?.result;
  if (
    !result ||
    (result.state !== "completed" &&
      result.state !== "aborted-with-statistics") ||
    !result.latency ||
    !result.throughput
  ) {
    return null;
  }
  return {
    hz: result.throughput.mean,
    meanMs: result.latency.mean,
    p75Ms: result.latency.p75,
    p99Ms: result.latency.p99,
    rme: result.latency.rme,
    samples: result.latency.samplesCount,
    periodMs: result.period ?? result.latency.mean,
  };
}
