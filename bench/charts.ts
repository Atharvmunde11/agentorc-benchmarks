/**
 * Clean SVG + PNG chart generation from results/benchmark.json
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import type { BenchmarkSuiteReport } from "./lib/types.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHARTS = join(ROOT, "results", "charts");

interface Series {
  label: string;
  value: number;
}

const COLORS = {
  bar: "#1f2937",
  barAlt: "#4b5563",
  axis: "#9ca3af",
  text: "#111827",
  grid: "#e5e7eb",
  bg: "#ffffff",
};

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function metricValue(
  report: BenchmarkSuiteReport,
  category: string,
  metricName: string,
  filter?: (row: BenchmarkSuiteReport["sections"][0]["rows"][0]) => boolean,
): Series[] {
  const section = report.sections.find((s) => s.id === category || s.title.toLowerCase().includes(category));
  if (!section) return [];
  return section.rows
    .filter((r) => (filter ? filter(r) : true))
    .map((r) => {
      const m = r.metrics.find((x) => x.name === metricName);
      return {
        label: r.dataset,
        value: m?.value ?? Number.NaN,
      };
    })
    .filter((s) => Number.isFinite(s.value));
}

function barChart(title: string, series: Series[], unit: string): string {
  const width = 840;
  const height = 420;
  const pad = { top: 56, right: 28, bottom: 64, left: 72 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const max = Math.max(...series.map((s) => s.value), 1);
  const gap = 12;
  const barW = Math.max(18, (plotW - gap * (series.length + 1)) / series.length);

  const bars = series
    .map((s, i) => {
      const h = (s.value / max) * plotH;
      const x = pad.left + gap + i * (barW + gap);
      const y = pad.top + plotH - h;
      return `
      <rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${COLORS.bar}" rx="3"/>
      <text x="${x + barW / 2}" y="${height - 28}" text-anchor="middle" font-size="12" fill="${COLORS.text}">${escapeXml(s.label)}</text>
      <text x="${x + barW / 2}" y="${y - 8}" text-anchor="middle" font-size="11" fill="${COLORS.text}">${formatShort(s.value, unit)}</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${COLORS.bg}"/>
  <text x="${pad.left}" y="32" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="${COLORS.text}">${escapeXml(title)}</text>
  <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + plotH}" stroke="${COLORS.axis}"/>
  <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${pad.left + plotW}" y2="${pad.top + plotH}" stroke="${COLORS.axis}"/>
  ${bars}
</svg>`;
}

function formatShort(value: number, unit: string): string {
  if (unit === "ops") {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0);
  }
  if (unit === "bytes") {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}G`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
    return String(Math.round(value));
  }
  if (unit === "ms") {
    if (value >= 1000) return `${(value / 1000).toFixed(2)}s`;
    return `${value.toFixed(value < 10 ? 2 : 0)}`;
  }
  if (unit === "pct") return `${(value * 100).toFixed(0)}%`;
  return value.toFixed(2);
}

async function writeChart(name: string, svg: string): Promise<void> {
  mkdirSync(CHARTS, { recursive: true });
  const svgPath = join(CHARTS, `${name}.svg`);
  const pngPath = join(CHARTS, `${name}.png`);
  writeFileSync(svgPath, svg, "utf8");
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log(`  chart ${name}.svg/.png`);
}

export async function generateCharts(
  reportPath = join(ROOT, "results", "benchmark.json"),
): Promise<string[]> {
  const report = JSON.parse(readFileSync(reportPath, "utf8")) as BenchmarkSuiteReport;
  const written: string[] = [];

  const charts: Array<{ name: string; title: string; series: Series[]; unit: string }> = [
    {
      name: "insert-throughput",
      title: "Insert throughput (ops/sec)",
      series: metricValue(report, "insert", "opsPerSec"),
      unit: "ops",
    },
    {
      name: "search-latency",
      title: "Search latency — average (ms)",
      series: metricValue(report, "search", "avgLatencyMs"),
      unit: "ms",
    },
    {
      name: "retrieval-latency",
      title: "Retrieval latency — top-5 average (ms)",
      series: metricValue(
        report,
        "retrieval",
        "avgLatencyMs",
        (r) => r.name.includes("top-5"),
      ),
      unit: "ms",
    },
    {
      name: "database-size",
      title: "Database size (bytes)",
      series: metricValue(report, "filesize", "sqliteBytes"),
      unit: "bytes",
    },
    {
      name: "memory-usage",
      title: "Process heap used (bytes)",
      series: metricValue(report, "memory", "heapUsed"),
      unit: "bytes",
    },
    {
      name: "startup-time",
      title: "Startup time (ms)",
      series: metricValue(report, "startup", "avgInitMs"),
      unit: "ms",
    },
    {
      name: "concurrency-throughput",
      title: "Concurrency throughput (ops/sec)",
      series: metricValue(report, "concurrency", "throughputOpsPerSec"),
      unit: "ops",
    },
    {
      name: "compression-ratio",
      title: "Active memory reduction",
      series: metricValue(report, "compression", "activeMemoryReduction").length
        ? metricValue(report, "compression", "activeMemoryReduction")
        : metricValue(report, "compression", "activeSetReduction"),
      unit: "pct",
    },
  ];

  for (const chart of charts) {
    if (chart.series.length === 0) {
      console.warn(`  skip ${chart.name} (no data)`);
      continue;
    }
    await writeChart(chart.name, barChart(chart.title, chart.series, chart.unit));
    written.push(chart.name);
  }
  return written;
}

const isMain = process.argv[1]?.includes("charts");
if (isMain) {
  generateCharts()
    .then((names) => {
      console.log(`Generated ${names.length} charts → results/charts/`);
    })
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    });
}
