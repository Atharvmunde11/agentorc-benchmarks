import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import {
  createClient,
  dbPathFor,
  ensureCleanDb,
  memorySnapshot,
  metric,
  populateDataset,
  row,
  sectionWrapper,
} from "./lib/harness.ts";
import { formatBytes } from "./lib/format.ts";

export async function runMemoryBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "memory",
    "Memory Usage",
    {
      what: "How much RAM the process uses while working.",
      why: "Memory growth can break long-running agent hosts.",
      how: "Snapshot process.memoryUsage() before init, after inserts, after search, and after close.",
    },
    async () => {
      const path = dbPathFor(ctx, "memory-usage");
      ensureCleanDb(path);
      const rows = [];
      const snap = (phase: string) => {
        const m = memorySnapshot();
        rows.push(
          row({
            category: "memory",
            name: "Memory Usage",
            dataset: phase,
            result: `heap ${formatBytes(m.heapUsed)} / rss ${formatBytes(m.rss)}`,
            metrics: [
              metric("heapUsed", m.heapUsed, formatBytes(m.heapUsed), "bytes"),
              metric("rss", m.rss, formatBytes(m.rss), "bytes"),
              metric("heapTotal", m.heapTotal, formatBytes(m.heapTotal), "bytes"),
            ],
          }),
        );
      };

      snap("baseline");
      const client = await createClient(ctx, path);
      snap("after init");
      const stages = ctx.scale === "quick" ? [100, 1_000] : [100, 1_000, 10_000];
      let inserted = 0;
      for (const target of stages) {
        await populateDataset(client, target - inserted, {
          startSeed: 300_000 + inserted,
        });
        inserted = target;
        snap(`after ${target} inserts`);
      }
      await client.recall({ query: "invoice refund roadmap deploy", topK: 10 });
      snap("after recall");
      await client.close();
      snap("after close");
      return { rows };
    },
  );
}
