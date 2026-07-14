import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import { pickSearchQueries } from "./generator.ts";
import { openDataset } from "./lib/datasets.ts";
import {
  metric,
  retrievalSizes,
  row,
  sectionWrapper,
} from "./lib/harness.ts";
import { formatMs, mean, percentile } from "./lib/format.ts";

const TOP_K = [5, 10, 20] as const;

export async function runRetrievalBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "retrieval",
    "Retrieval",
    {
      what: "How long it takes to return the top 5, 10, or 20 matches.",
      why: "Agents often need a shortlist, not a single hit.",
      how: "Run the same realistic queries against 1k / 10k / 100k memories for each top-K.",
    },
    async () => {
      const rows = [];
      const queries = pickSearchQueries(8);
      for (const size of retrievalSizes(ctx.scale)) {
        const { client } = await openDataset(ctx, size);
        for (const topK of TOP_K) {
          const samples: number[] = [];
          const iterations = ctx.scale === "quick" ? 6 : 15;
          for (let i = 0; i < iterations; i += 1) {
            const start = performance.now();
            await client.recall({ query: queries[i % queries.length]!, topK });
            samples.push(performance.now() - start);
          }
          samples.sort((a, b) => a - b);
          const avg = mean(samples);
          rows.push(
            row({
              category: "retrieval",
              name: `Retrieval top-${topK}`,
              dataset: String(size),
              result: formatMs(avg),
              metrics: [
                metric("avgLatencyMs", avg, formatMs(avg), "ms"),
                metric("p95Ms", percentile(samples, 95), formatMs(percentile(samples, 95)), "ms"),
                metric("p99Ms", percentile(samples, 99), formatMs(percentile(samples, 99)), "ms"),
                metric("topK", topK, String(topK)),
              ],
              details: { samplesMs: samples },
            }),
          );
          console.log(`    retrieval ${size} top-${topK}: ${formatMs(avg)}`);
        }
        await client.close();
      }
      return { rows };
    },
  );
}
