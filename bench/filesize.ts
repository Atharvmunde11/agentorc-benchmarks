import type { BenchContext, BenchmarkSection } from "./lib/types.ts";
import { ensureDataset } from "./lib/datasets.ts";
import {
  createClient,
  fileSizeBytes,
  insertSizes,
  metric,
  row,
  sectionWrapper,
} from "./lib/harness.ts";
import { formatBytes } from "./lib/format.ts";

export async function runFilesizeBenchmark(
  ctx: BenchContext,
): Promise<BenchmarkSection> {
  return sectionWrapper(
    "filesize",
    "Database Size",
    {
      what: "How large the SQLite file gets as memories grow.",
      why: "Disk growth matters for laptops, containers, and backups.",
      how: "Measure file size after 100 / 1k / 10k / 100k memories stored through the SDK.",
    },
    async () => {
      const rows = [];
      for (const size of insertSizes(ctx.scale)) {
        const path = await ensureDataset(ctx, size);
        const client = await createClient(ctx, path);
        const stats = await client.stats();
        await client.close();
        const bytes = fileSizeBytes(path);
        rows.push(
          row({
            category: "filesize",
            name: "Database Size",
            dataset: String(size),
            result: formatBytes(bytes),
            metrics: [
              metric("sqliteBytes", bytes, formatBytes(bytes), "bytes"),
              metric("bytesPerMemory", bytes / size, formatBytes(bytes / size), "bytes"),
              metric(
                "statsDatabaseSizeBytes",
                stats.databaseSizeBytes,
                formatBytes(stats.databaseSizeBytes),
                "bytes",
              ),
            ],
            details: { path },
          }),
        );
        console.log(`    filesize ${size}: ${formatBytes(bytes)}`);
      }
      return { rows };
    },
  );
}
