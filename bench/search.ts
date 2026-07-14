import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import { pickSearchQueries } from "./generator.ts";
import { openDataset } from "./lib/datasets.ts";
import {
  insertSizes,
  metric,
  row,
  sectionWrapper,
} from "./lib/harness.ts";
import { formatMs, mean, percentile } from "./lib/format.ts";

export async function runSearchBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "search",
    "Search",
    {
      what: "How long semantic search takes.",
      why: "Agents need quick answers from memory while users wait.",
      how: "Fill the database first. Run realistic natural-language queries. Report average, p95, and p99 latency.",
    },
    async () => {
      const rows = [];
      const queries = pickSearchQueries(ctx.scale === "quick" ? 6 : 12);
      for (const size of insertSizes(ctx.scale)) {
        const { client } = await openDataset(ctx, size);
        const samples: number[] = [];
        const iterations = ctx.scale === "quick" ? 8 : 20;
        for (let i = 0; i < iterations; i += 1) {
          const start = performance.now();
          await client.recall({ query: queries[i % queries.length]!, topK: 5 });
          samples.push(performance.now() - start);
        }
        samples.sort((a, b) => a - b);
        const avg = mean(samples);
        const p95 = percentile(samples, 95);
        const p99 = percentile(samples, 99);
        await client.close();
        rows.push(
          row({
            category: "search",
            name: "Search",
            dataset: String(size),
            result: formatMs(avg),
            metrics: [
              metric("avgLatencyMs", avg, formatMs(avg), "ms"),
              metric("p95Ms", p95, formatMs(p95), "ms"),
              metric("p99Ms", p99, formatMs(p99), "ms"),
            ],
            details: { iterations, queries, samplesMs: samples },
          }),
        );
        console.log(`    search ${size}: avg ${formatMs(avg)} | p95 ${formatMs(p95)}`);
      }
      return { rows };
    },
  );
}
