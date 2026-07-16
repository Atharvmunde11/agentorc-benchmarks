import { existsSync } from "node:fs";
import { Wolbarg } from "wolbarg";
import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import {
  createInitOptions,
  dbPathFor,
  ensureCleanDb,
  metric,
  populateDataset,
  row,
  sectionWrapper,
  timed,
} from "./lib/harness.ts";
import { formatMs, mean } from "./lib/format.ts";

export async function runStartupBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "startup",
    "Startup",
    {
      what: "How long Wolbarg takes to start.",
      why: "Cold starts affect CLI tools and serverless-style runs.",
      how: "Measure init() on a new empty database (cold) and on an existing database (warm).",
    },
    async () => {
      const warmPath = dbPathFor(ctx, "startup-warm");
      ensureCleanDb(warmPath);
      {
        const seed = new Wolbarg();
        await seed.init(createInitOptions(ctx, warmPath));
        await populateDataset(seed, ctx.scale === "quick" ? 50 : 200, {
          startSeed: 200_000,
        });
        await seed.close();
      }

      const coldSamples: number[] = [];
      const warmSamples: number[] = [];
      const iterations = ctx.scale === "quick" ? 3 : 5;

      for (let i = 0; i < iterations; i += 1) {
        const coldPath = dbPathFor(ctx, `startup-cold-${i}`);
        ensureCleanDb(coldPath);
        const cold = new Wolbarg();
        const { ms: coldMs } = await timed(() =>
          cold.init(createInitOptions(ctx, coldPath)),
        );
        coldSamples.push(coldMs);
        await cold.close();

        const warm = new Wolbarg();
        const { ms: warmMs } = await timed(() =>
          warm.init(createInitOptions(ctx, warmPath)),
        );
        warmSamples.push(warmMs);
        await warm.close();
      }

      const coldAvg = mean(coldSamples);
      const warmAvg = mean(warmSamples);

      return {
        rows: [
          row({
            category: "startup",
            name: "Startup",
            dataset: "Cold",
            result: formatMs(coldAvg),
            metrics: [metric("avgInitMs", coldAvg, formatMs(coldAvg), "ms")],
            details: { samplesMs: coldSamples },
          }),
          row({
            category: "startup",
            name: "Startup",
            dataset: "Warm",
            result: formatMs(warmAvg),
            metrics: [metric("avgInitMs", warmAvg, formatMs(warmAvg), "ms")],
            details: {
              samplesMs: warmSamples,
              dbExists: existsSync(warmPath),
            },
          }),
        ],
      };
    },
  );
}
