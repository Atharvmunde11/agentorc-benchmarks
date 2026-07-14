import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import { generateMemory } from "./generator.ts";
import {
  concurrencyLevels,
  createClient,
  dbPathFor,
  ensureCleanDb,
  metric,
  row,
  sectionWrapper,
  timed,
} from "./lib/harness.ts";
import { formatMs, formatOps, mean } from "./lib/format.ts";

export async function runConcurrencyBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "concurrency",
    "Concurrency",
    {
      what: "How the SDK behaves when many writers run at once.",
      why: "Multi-agent systems write in parallel.",
      how: "Launch 10 / 50 / 100 concurrent writers on one client. Measure throughput, failures, and average latency.",
    },
    async () => {
      const writesPerWorker = ctx.scale === "quick" ? 5 : 10;
      const rows = [];

      for (const writers of concurrencyLevels(ctx.scale)) {
        const path = dbPathFor(ctx, `concurrency-${writers}`);
        ensureCleanDb(path);
        const client = await createClient(ctx, path);
        let failures = 0;
        const latencies: number[] = [];
        let nextSeed = writers * 1000;

        const { ms: totalMs } = await timed(async () => {
          await Promise.all(
            Array.from({ length: writers }, (_, workerId) =>
              (async () => {
                for (let i = 0; i < writesPerWorker; i += 1) {
                  const memory = generateMemory(nextSeed++ + workerId);
                  const start = performance.now();
                  try {
                    await client.remember({
                      agent: memory.agent,
                      content: { text: `${memory.text} [w${workerId}/${i}]` },
                      metadata: { ...memory.metadata, workerId },
                    });
                  } catch {
                    failures += 1;
                  }
                  latencies.push(performance.now() - start);
                }
              })(),
            ),
          );
        });

        const totalOps = writers * writesPerWorker;
        const successes = totalOps - failures;
        const throughput = successes / (totalMs / 1000);
        await client.close();

        rows.push(
          row({
            category: "concurrency",
            name: "Concurrency",
            dataset: `${writers} writers`,
            result: formatOps(throughput),
            metrics: [
              metric("throughputOpsPerSec", throughput, formatOps(throughput), "ops/sec"),
              metric("failures", failures, String(failures)),
              metric("avgLatencyMs", mean(latencies), formatMs(mean(latencies)), "ms"),
            ],
          }),
        );
        console.log(
          `    concurrency ${writers}: ${formatOps(throughput)} | failures ${failures}`,
        );
      }
      return { rows };
    },
  );
}
