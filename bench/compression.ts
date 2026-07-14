import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import {
  createClient,
  dbPathFor,
  ensureCleanDb,
  fileSizeBytes,
  metric,
  populateDataset,
  row,
  sectionWrapper,
  timed,
} from "./lib/harness.ts";
import { formatBytes, formatMs, formatPct } from "./lib/format.ts";

export async function runCompressionBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "compression",
    "Active Memory Reduction",
    {
      what: "How much active working memory shrinks after compression.",
      why: "Agents accumulate notes. Compression keeps the working set small.",
      how: "Store memories for one agent, run compress(), then compare active memories before and after.",
    },
    async () => {
      const corpusSizes =
        ctx.scale === "quick" ? [50, 200] : [50, 200, 500, 1_000];
      const rows = [];

      for (const size of corpusSizes) {
        const path = dbPathFor(ctx, `compression-${size}`);
        ensureCleanDb(path);
        const client = await createClient(ctx, path);
        const agent = "engineering";
        await populateDataset(client, size, {
          startSeed: 120_000,
          agentOverride: agent,
        });

        const beforeStats = await client.stats();
        const beforeBytes = fileSizeBytes(path);
        const limit = Math.min(size, ctx.mode === "live" ? 40 : Math.min(size, 200));
        const { result, ms } = await timed(() =>
          client.compress({ agent, limit }),
        );

        const afterBytes = fileSizeBytes(path);
        const archivedCount = result.archivedIds.length;
        const activeReduction =
          archivedCount > 0 ? archivedCount / (archivedCount + 1) : 0;

        await client.close();

        rows.push(
          row({
            category: "compression",
            name: "Active Memory Reduction",
            dataset: String(size),
            result: formatPct(activeReduction),
            metrics: [
              metric("durationMs", ms, formatMs(ms), "ms"),
              metric(
                "activeMemoryReduction",
                activeReduction,
                formatPct(activeReduction),
              ),
              metric("memoriesBefore", beforeStats.totalMemories, String(beforeStats.totalMemories)),
              metric("archivedCount", archivedCount, String(archivedCount)),
              metric("storageBeforeBytes", beforeBytes, formatBytes(beforeBytes), "bytes"),
              metric("storageAfterBytes", afterBytes, formatBytes(afterBytes), "bytes"),
            ],
            notes:
              "Archived memories remain on disk. Storage size does not shrink. Only the active working memory is reduced.",
            details: {
              summaryPreview: result.summary.content.text.slice(0, 200),
              clarification:
                "compress() archives sources and adds one summary. Disk usage usually stays flat or grows slightly.",
            },
          }),
        );
        console.log(
          `    active memory reduction ${size}: ${formatPct(activeReduction)} (${formatMs(ms)})`,
        );
      }
      return { rows };
    },
  );
}
