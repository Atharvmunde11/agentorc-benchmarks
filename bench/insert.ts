import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import { generateMemory } from "./generator.ts";
import {
  createClient,
  dbPathFor,
  ensureCleanDb,
  insertSizes,
  metric,
  row,
  sectionWrapper,
  timed,
} from "./lib/harness.ts";
import { formatMs, formatOps } from "./lib/format.ts";

export async function runInsertBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "insert",
    "Insert",
    {
      what: "How fast Agent ORC can store new memories.",
      why: "Agents write continuously. Slow writes block the whole system.",
      how: "Insert N realistic memories one by one through remember(). Report total time, ops/sec, and average latency.",
    },
    async () => {
      const rows = [];
      for (const size of insertSizes(ctx.scale)) {
        const path = dbPathFor(ctx, `insert-${size}`);
        ensureCleanDb(path);
        const client = await createClient(ctx, path);
        let seed = 1;
        const { ms: totalMs } = await timed(async () => {
          for (let i = 0; i < size; i += 1) {
            const memory = generateMemory(seed++);
            await client.remember({
              agent: memory.agent,
              content: { text: memory.text },
              metadata: memory.metadata,
            });
          }
        });
        const opsPerSec = size / (totalMs / 1000);
        const avgLatencyMs = totalMs / size;
        const stats = await client.stats();
        await client.close();

        rows.push(
          row({
            category: "insert",
            name: "Insert",
            dataset: String(size),
            result: formatOps(opsPerSec),
            metrics: [
              metric("totalTimeMs", totalMs, formatMs(totalMs), "ms"),
              metric("opsPerSec", opsPerSec, formatOps(opsPerSec), "ops/sec"),
              metric("avgLatencyMs", avgLatencyMs, formatMs(avgLatencyMs), "ms"),
              metric("memoriesStored", stats.totalMemories, String(stats.totalMemories)),
            ],
            details: { databaseSizeBytes: stats.databaseSizeBytes },
          }),
        );
        console.log(`    insert ${size}: ${formatOps(opsPerSec)}`);
      }
      return { rows };
    },
  );
}
