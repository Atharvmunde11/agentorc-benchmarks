/**
 * Report writers: detailed JSON/MD + clean public README.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { BenchmarkSection, BenchmarkSuiteReport, BenchContext } from "./lib/types.ts";
import { formatBytes, formatMs } from "./lib/format.ts";
import { runtimeInfo } from "./lib/harness.ts";
import { adapterLabel } from "./lib/adapters.ts";
import {
  renderFeatureMarkdownTable,
  PRODUCTS,
} from "../comparison/features.ts";

const SUITE_VERSION = "1.0.0";

export function buildReport(
  ctx: BenchContext,
  sections: BenchmarkSection[],
  wallClockMs: number,
  sdkMeta: {
    embeddingModel: string;
    llmModel: string;
    embeddingDimensions: number;
  },
): BenchmarkSuiteReport {
  return {
    generatedAt: new Date().toISOString(),
    suiteVersion: SUITE_VERSION,
    mode: ctx.mode,
    scale: ctx.scale,
    adapter: ctx.adapter,
    runtime: runtimeInfo(),
    sdk: {
      package: "agentorc",
      organization: ctx.organization,
      embeddingMode:
        ctx.mode === "mock" ? "local-mock-openai-compatible" : "live-api",
      embeddingModel: sdkMeta.embeddingModel,
      llmModel: sdkMeta.llmModel,
      embeddingDimensions: sdkMeta.embeddingDimensions,
    },
    sections,
    summaryTable: sections.flatMap((s) =>
      s.rows.map((r) => ({
        benchmark: r.name,
        dataset: r.dataset,
        result: r.result,
      })),
    ),
    totals: {
      sections: sections.length,
      rows: sections.reduce((n, s) => n + s.rows.length, 0),
      wallClockMs,
    },
  };
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function mdTable(headers: string[], rows: string[][]): string {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows
    .map((r) => `| ${r.map((c) => escapeCell(c)).join(" | ")} |`)
    .join("\n");
  return `${head}\n${sep}\n${body}`;
}

/** Detailed report — samples, metrics, paths OK here. */
export function renderDetailedMarkdown(report: BenchmarkSuiteReport): string {
  const lines: string[] = [];
  lines.push("# Agent ORC Benchmark Report");
  lines.push("");
  lines.push(
    `Generated **${report.generatedAt}** · suite v${report.suiteVersion} · mode \`${report.mode}\` · scale \`${report.scale}\` · adapter \`${report.adapter}\``,
  );
  lines.push("");
  lines.push("## Environment");
  lines.push("");
  lines.push(
    mdTable(
      ["Key", "Value"],
      [
        ["Node", report.runtime.node],
        ["Platform", `${report.runtime.platform}/${report.runtime.arch}`],
        ["CPUs", String(report.runtime.cpus)],
        ["Host RAM", formatBytes(report.runtime.totalMemBytes)],
        ["Embedding", report.sdk.embeddingModel],
        ["LLM", report.sdk.llmModel],
        ["Dims", String(report.sdk.embeddingDimensions)],
        ["Wall clock", formatMs(report.totals.wallClockMs)],
      ],
    ),
  );
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(
    mdTable(
      ["Benchmark", "Dataset", "Result"],
      report.summaryTable.map((r) => [r.benchmark, r.dataset, r.result]),
    ),
  );

  for (const section of report.sections) {
    lines.push("");
    lines.push(`## ${section.title}`);
    lines.push("");
    lines.push(`**What:** ${section.what ?? "(see methodology)"}`);
    lines.push("");
    lines.push(`**Why:** ${section.why ?? ""}`);
    lines.push("");
    lines.push(`**How:** ${section.how ?? ""}`);
    lines.push("");
    lines.push(`_Section duration: ${formatMs(section.durationMs)}_`);
    lines.push("");
    lines.push(
      mdTable(
        ["Benchmark", "Dataset", "Result"],
        section.rows.map((r) => [r.name, r.dataset, r.result]),
      ),
    );
    for (const r of section.rows) {
      lines.push("");
      lines.push(`### ${r.name} — ${r.dataset}`);
      if (r.notes) {
        lines.push("");
        lines.push(`> ${r.notes}`);
      }
      if (r.metrics.length) {
        lines.push("");
        lines.push(
          mdTable(
            ["Metric", "Value"],
            r.metrics.map((m) => [m.name, m.display]),
          ),
        );
      }
      if (r.details) {
        lines.push("");
        lines.push("```json");
        lines.push(JSON.stringify(r.details, null, 2));
        lines.push("```");
      }
    }
  }

  lines.push("");
  lines.push("## Feature comparison");
  lines.push("");
  lines.push(renderFeatureMarkdownTable());
  lines.push("");
  lines.push("Notes:");
  for (const p of PRODUCTS) {
    for (const note of p.notes) {
      lines.push(`- **${p.name}:** ${note}`);
    }
  }
  lines.push("");
  lines.push(
    "No competitor latency or throughput numbers are published here. Feature values are Yes / No / Partial / Unknown from public docs only.",
  );
  return lines.join("\n");
}

/** Clean public README — no samples, paths, or raw JSON dumps. */
export function renderReadme(report: BenchmarkSuiteReport): string {
  const chartBlock = [
    "insert-throughput",
    "search-latency",
    "retrieval-latency",
    "database-size",
    "memory-usage",
    "startup-time",
    "concurrency-throughput",
    "compression-ratio",
  ]
    .map(
      (name) =>
        `### ${titleCase(name)}\n\n![${name}](results/charts/${name}.svg)\n`,
    )
    .join("\n");

  return `# Agent ORC Benchmarks

Public, reproducible benchmarks for [Agent ORC](https://AgentOrc.lucareo.com) — local-first semantic memory for AI agents.

These benchmarks measure the **complete Agent ORC SDK**, not raw SQLite.

\`\`\`bash
npm install
npm run benchmark
\`\`\`

## Environment

| Key | Value |
| --- | --- |
| Node | ${report.runtime.node} |
| Platform | ${report.runtime.platform}/${report.runtime.arch} |
| CPUs | ${report.runtime.cpus} |
| RAM | ${formatBytes(report.runtime.totalMemBytes)} |
| Mode | ${report.mode} |
| Adapter | ${adapterLabel(report.adapter)} |
| Generated | ${report.generatedAt} |

## Summary

| Benchmark | Dataset | Result |
| --- | --- | --- |
${report.summaryTable.map((r) => `| ${r.benchmark} | ${r.dataset} | ${r.result} |`).join("\n")}

## Performance Charts

${chartBlock}

## Methodology

Every suite answers three questions in plain English:

1. **What is being measured?**
2. **Why does it matter?**
3. **How was it measured?**

Full write-ups live in [\`results/benchmark.md\`](results/benchmark.md).

### Active memory reduction (compression)

Compression shrinks the **active working set**.

- Archived memories **remain on disk**
- Storage size does **not** shrink
- Only active working memory is reduced

### Modes

| Mode | Command | Use when |
| --- | --- | --- |
| Mock (default) | \`npm run benchmark\` | Reproduce SDK numbers without API cost |
| Live | \`npm run benchmark:live\` | Measure with your own embedding/LLM keys |
| Quick | \`npm run benchmark:quick\` | Smaller datasets for CI / smoke tests |

Storage adapter today: **SQLite**. PostgreSQL is reserved for a future SDK adapter.

## How to compare tools

Feature comparison only — **no invented speed numbers**.

${renderFeatureMarkdownTable()}

Values are **Yes / No / Partial / Unknown** based on public documentation. See [\`comparison/features.ts\`](comparison/features.ts) for notes.

Website: [AgentOrc.lucareo.com/benchmarks](https://AgentOrc.lucareo.com/benchmarks)

## How to reproduce

\`\`\`bash
git clone https://github.com/Atharvmunde11/agentorc-benchmarks.git
cd agentorc-benchmarks
npm install
npm run benchmark        # full suite
npm run charts           # regenerate charts from results/benchmark.json
\`\`\`

Requires **Node.js 22.5+**.

Detailed JSON: [\`results/benchmark.json\`](results/benchmark.json)

## How to contribute

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
`;
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function writeReports(
  ctx: BenchContext,
  report: BenchmarkSuiteReport,
): void {
  const jsonPath = join(ctx.resultsDir, "benchmark.json");
  const mdPath = join(ctx.resultsDir, "benchmark.md");
  const readmePath = join(ctx.resultsDir, "..", "README.md");

  writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
  writeFileSync(mdPath, renderDetailedMarkdown(report), "utf8");
  writeFileSync(readmePath, renderReadme(report), "utf8");
}

/** Rebuild README + detailed MD + charts from an existing JSON file. */
export function loadReport(path: string): BenchmarkSuiteReport {
  return JSON.parse(readFileSync(path, "utf8")) as BenchmarkSuiteReport;
}
