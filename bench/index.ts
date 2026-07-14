/**
 * Agent ORC public benchmark runner.
 *
 * npm run benchmark
 * npm run benchmark:quick
 * npm run benchmark:live
 */

import { AgentOrc } from "agentorc";
import type { BenchmarkFn, BenchmarkSection } from "./lib/types.ts";
import {
  buildContext,
  createInitOptions,
  dbPathFor,
  ensureCleanDb,
  resolveCliArgs,
} from "./lib/harness.ts";
import { buildReport, loadReport, writeReports, renderDetailedMarkdown, renderReadme } from "./report.ts";
import { generateCharts } from "./charts.ts";
import { runInsertBenchmark } from "./insert.ts";
import { runSearchBenchmark } from "./search.ts";
import { runRetrievalBenchmark } from "./retrieval.ts";
import { runCompressionBenchmark } from "./compression.ts";
import { runStartupBenchmark } from "./startup.ts";
import { runConcurrencyBenchmark } from "./concurrency.ts";
import { runMemoryBenchmark } from "./memory.ts";
import { runFilesizeBenchmark } from "./filesize.ts";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const BENCHMARKS: Array<{ id: string; run: BenchmarkFn }> = [
  { id: "startup", run: runStartupBenchmark },
  { id: "compression", run: runCompressionBenchmark },
  { id: "concurrency", run: runConcurrencyBenchmark },
  { id: "memory", run: runMemoryBenchmark },
  { id: "filesize", run: runFilesizeBenchmark },
  { id: "search", run: runSearchBenchmark },
  { id: "retrieval", run: runRetrievalBenchmark },
  { id: "insert", run: runInsertBenchmark },
];

async function probeSdkMeta(ctx: Awaited<ReturnType<typeof buildContext>>["ctx"]) {
  const path = dbPathFor(ctx, "probe-meta");
  ensureCleanDb(path);
  const client = new AgentOrc();
  await client.init(createInitOptions(ctx, path));
  const stats = await client.stats();
  await client.close();
  return {
    embeddingModel: stats.embeddingModel,
    llmModel: stats.llmModel,
    embeddingDimensions: stats.embeddingDimensions,
  };
}

async function reportOnly(): Promise<void> {
  const jsonPath = join(process.cwd(), "results", "benchmark.json");
  const report = loadReport(jsonPath);
  // Normalize missing what/why/how from older JSON
  for (const section of report.sections) {
    if (!section.what) {
      section.what = section.title;
      section.why = "See methodology.";
      section.how = "See detailed report.";
    }
    // Improve compression wording in summary if needed
    for (const row of section.rows) {
      if (
        row.category === "compression" &&
        row.result.toLowerCase().includes("reduction")
      ) {
        row.name = "Active Memory Reduction";
        row.result = row.result.replace(/\s*reduction/i, "").trim();
        row.notes =
          "Archived memories remain on disk. Storage size does not shrink. Only the active working memory is reduced.";
      }
    }
  }
  report.summaryTable = report.sections.flatMap((s) =>
    s.rows.map((r) => ({
      benchmark: r.name,
      dataset: r.dataset,
      result: r.result,
    })),
  );

  writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
  writeFileSync(
    join(process.cwd(), "results", "benchmark.md"),
    renderDetailedMarkdown(report),
    "utf8",
  );
  writeFileSync(join(process.cwd(), "README.md"), renderReadme(report), "utf8");
  await generateCharts(jsonPath);
  console.log("Rebuilt README, benchmark.md, and charts from existing JSON.");
}

async function main(): Promise<void> {
  const { mode, scale, reportOnly: only } = resolveCliArgs();
  if (only) {
    await reportOnly();
    return;
  }

  console.log("══════════════════════════════════════════════");
  console.log(" Agent ORC Benchmarks");
  console.log("══════════════════════════════════════════════");
  console.log(` mode=${mode}  scale=${scale}`);

  const { ctx, cleanup } = await buildContext(mode, scale);
  const wallStart = performance.now();

  try {
    const sdkMeta = await probeSdkMeta(ctx);
    const sections: BenchmarkSection[] = [];
    for (const entry of BENCHMARKS) {
      sections.push(await entry.run(ctx));
    }
    const wallClockMs = performance.now() - wallStart;
    const report = buildReport(ctx, sections, wallClockMs, sdkMeta);
    writeReports(ctx, report);
    await generateCharts(join(ctx.resultsDir, "benchmark.json"));

    console.log("\nDone.");
    console.log(` rows: ${report.totals.rows}`);
    console.log(` wall: ${(wallClockMs / 1000).toFixed(1)}s`);
    console.log(" outputs: results/benchmark.json, results/benchmark.md, README.md, results/charts/");
  } finally {
    await cleanup();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
