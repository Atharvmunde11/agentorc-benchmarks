/** Shared types for the Wolbarg benchmark suite. */

export type StorageAdapterName = "sqlite" | "postgres";
export type BenchMode = "mock" | "live";
export type BenchScale = "full" | "quick";

export type BenchmarkCategory =
  | "insert"
  | "search"
  | "retrieval"
  | "compression"
  | "startup"
  | "concurrency"
  | "memory"
  | "filesize";

export interface MetricValue {
  name: string;
  value: number | null;
  display: string;
  unit?: string;
}

export interface BenchmarkResultRow {
  category: BenchmarkCategory;
  name: string;
  dataset: string;
  /** Short public-facing result string for summary tables */
  result: string;
  metrics: MetricValue[];
  /** Debug / machine detail — appears in benchmark.md + JSON only */
  details?: Record<string, unknown>;
  notes?: string;
}

export interface BenchmarkSection {
  id: string;
  title: string;
  /** Simple English: what / why / how */
  what: string;
  why: string;
  how: string;
  rows: BenchmarkResultRow[];
  durationMs: number;
}

export interface BenchmarkSuiteReport {
  generatedAt: string;
  suiteVersion: string;
  mode: BenchMode;
  scale: BenchScale;
  adapter: StorageAdapterName;
  runtime: {
    node: string;
    platform: string;
    arch: string;
    cpus: number;
    totalMemBytes: number;
  };
  sdk: {
    package: string;
    organization: string;
    embeddingMode: string;
    embeddingModel: string;
    llmModel: string;
    embeddingDimensions: number;
  };
  sections: BenchmarkSection[];
  summaryTable: Array<{ benchmark: string; dataset: string; result: string }>;
  totals: { sections: number; rows: number; wallClockMs: number };
}

export interface BenchContext {
  mode: BenchMode;
  scale: BenchScale;
  adapter: StorageAdapterName;
  dataDir: string;
  resultsDir: string;
  chartsDir: string;
  organization: string;
  embedding: {
    baseUrl: string;
    apiKey: string;
    model: string;
    dimensions: number;
  };
  llm: {
    baseUrl: string;
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };
}

export type BenchmarkFn = (ctx: BenchContext) => Promise<BenchmarkSection>;
