/**
 * Feature + competitor comparison — public docs only.
 * Values: Yes | No | Partial | Unknown
 * Never invent performance numbers for third parties.
 *
 * Columns emphasize agent-memory product capabilities (not raw ANN engine axes).
 */

export type FeatureValue = "Yes" | "No" | "Partial" | "Unknown";

export function featureMark(value: FeatureValue): string {
  switch (value) {
    case "Yes":
      return "✅";
    case "No":
      return "❌";
    case "Partial":
      return "⚠️";
    case "Unknown":
      return "❓";
  }
}

export const FEATURE_LEGEND =
  "✅ Supported · ⚠️ Partial · ❌ No · ❓ Unknown";

/**
 * Meaningful comparison axes for agent memory SDKs / platforms.
 * Prefer operational product capabilities over marketing synonyms.
 */
export const FEATURE_COLUMNS = [
  "Local-first / offline",
  "Native SQLite",
  "Native PostgreSQL",
  "Framework-agnostic SDK",
  "Model / provider agnostic",
  "Semantic recall",
  "Hybrid keyword + vector",
  "Metadata filters",
  "Memory compression",
  "Write-time dedupe / upsert",
  "Real-time change events",
  "Embedding cache",
  "Multi-writer concurrency hardening",
  "Multi-tenant org scoping",
  "First-party telemetry",
  "Checkpoints / rollback",
  "Batch remember / recall",
  "Document ingest pipeline",
  "Open source",
  "Public reproducible storage benchmarks",
] as const;

export type FeatureColumn = (typeof FEATURE_COLUMNS)[number];

export interface ProductFeatures {
  name: string;
  homepage: string;
  highlight?: boolean;
  license: string;
  architecture: string;
  storageBackend: string;
  productionReady: FeatureValue;
  features: Record<FeatureColumn, FeatureValue>;
  notes: string[];
}

/**
 * Capability matrix from public product docs / READMEs.
 * Latency columns are intentionally omitted — see COMPETITOR_LATENCY_POLICY.
 */
export const PRODUCTS: ProductFeatures[] = [
  {
    name: "Wolbarg",
    homepage: "https://wolbarg.com",
    highlight: true,
    license: "MIT",
    architecture: "TypeScript agent-memory SDK · dual storage · DI embeddings/LLM",
    storageBackend: "SQLite + PostgreSQL (pgvector)",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Yes",
      "Native SQLite": "Yes",
      "Native PostgreSQL": "Yes",
      "Framework-agnostic SDK": "Yes",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Yes",
      "Metadata filters": "Yes",
      "Memory compression": "Yes",
      "Write-time dedupe / upsert": "Yes",
      "Real-time change events": "Yes",
      "Embedding cache": "Yes",
      "Multi-writer concurrency hardening": "Yes",
      "Multi-tenant org scoping": "Yes",
      "First-party telemetry": "Yes",
      "Checkpoints / rollback": "Yes",
      "Batch remember / recall": "Yes",
      "Document ingest pipeline": "Yes",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "Yes",
    },
    notes: [],
  },
  {
    name: "Mem0",
    homepage: "https://mem0.ai",
    license: "Apache-2.0 (OSS)",
    architecture: "Memory extraction + retrieval service / SDK",
    storageBackend: "Pluggable vector stores",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "Partial",
      "Native PostgreSQL": "Partial",
      "Framework-agnostic SDK": "Yes",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Partial",
      "Metadata filters": "Yes",
      "Memory compression": "Yes",
      "Write-time dedupe / upsert": "Partial",
      "Real-time change events": "Partial",
      "Embedding cache": "Unknown",
      "Multi-writer concurrency hardening": "Unknown",
      "Multi-tenant org scoping": "Partial",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "No",
      "Batch remember / recall": "Partial",
      "Document ingest pipeline": "Partial",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "No",
    },
    notes: [],
  },
  {
    name: "Zep",
    homepage: "https://www.getzep.com",
    license: "Mixed (Cloud + Graphiti OSS)",
    architecture: "Temporal knowledge graph (Graphiti)",
    storageBackend: "Graph DB + vectors",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "No",
      "Native PostgreSQL": "Partial",
      "Framework-agnostic SDK": "Yes",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Yes",
      "Metadata filters": "Partial",
      "Memory compression": "Partial",
      "Write-time dedupe / upsert": "Partial",
      "Real-time change events": "Partial",
      "Embedding cache": "Unknown",
      "Multi-writer concurrency hardening": "Unknown",
      "Multi-tenant org scoping": "Yes",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "No",
      "Batch remember / recall": "Partial",
      "Document ingest pipeline": "Partial",
      "Open source": "Partial",
      "Public reproducible storage benchmarks": "No",
    },
    notes: [],
  },
  {
    name: "Letta",
    homepage: "https://www.letta.com",
    license: "Apache-2.0",
    architecture: "Agent runtime with tiered memory (MemGPT lineage)",
    storageBackend: "Agent-managed tiers",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "Partial",
      "Native PostgreSQL": "Partial",
      "Framework-agnostic SDK": "Partial",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Unknown",
      "Metadata filters": "Partial",
      "Memory compression": "Yes",
      "Write-time dedupe / upsert": "Unknown",
      "Real-time change events": "Unknown",
      "Embedding cache": "Unknown",
      "Multi-writer concurrency hardening": "Unknown",
      "Multi-tenant org scoping": "Unknown",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "Partial",
      "Batch remember / recall": "Unknown",
      "Document ingest pipeline": "Partial",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "No",
    },
    notes: [],
  },
  {
    name: "LangGraph Memory",
    homepage: "https://langchain-ai.github.io/langgraph/",
    license: "MIT",
    architecture: "Graph agent runtime + checkpointers / stores",
    storageBackend: "Pluggable (Postgres, …)",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "Partial",
      "Native PostgreSQL": "Yes",
      "Framework-agnostic SDK": "No",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Partial",
      "Hybrid keyword + vector": "Unknown",
      "Metadata filters": "Partial",
      "Memory compression": "Partial",
      "Write-time dedupe / upsert": "No",
      "Real-time change events": "No",
      "Embedding cache": "Unknown",
      "Multi-writer concurrency hardening": "Partial",
      "Multi-tenant org scoping": "Partial",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "Yes",
      "Batch remember / recall": "Partial",
      "Document ingest pipeline": "Partial",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "No",
    },
    notes: [],
  },
  {
    name: "LlamaIndex",
    homepage: "https://www.llamaindex.ai",
    license: "MIT",
    architecture: "Data framework / RAG orchestration",
    storageBackend: "Pluggable stores",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "Partial",
      "Native PostgreSQL": "Partial",
      "Framework-agnostic SDK": "Partial",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Yes",
      "Metadata filters": "Yes",
      "Memory compression": "Partial",
      "Write-time dedupe / upsert": "Partial",
      "Real-time change events": "No",
      "Embedding cache": "Partial",
      "Multi-writer concurrency hardening": "Unknown",
      "Multi-tenant org scoping": "Unknown",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "No",
      "Batch remember / recall": "Yes",
      "Document ingest pipeline": "Yes",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "No",
    },
    notes: [],
  },
  {
    name: "Mastra",
    homepage: "https://mastra.ai",
    license: "Apache-2.0",
    architecture: "TypeScript agent framework",
    storageBackend: "Framework-integrated stores",
    productionReady: "Partial",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "Partial",
      "Native PostgreSQL": "Partial",
      "Framework-agnostic SDK": "No",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Partial",
      "Hybrid keyword + vector": "Unknown",
      "Metadata filters": "Partial",
      "Memory compression": "Unknown",
      "Write-time dedupe / upsert": "Unknown",
      "Real-time change events": "Unknown",
      "Embedding cache": "Unknown",
      "Multi-writer concurrency hardening": "Unknown",
      "Multi-tenant org scoping": "Unknown",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "Partial",
      "Batch remember / recall": "Partial",
      "Document ingest pipeline": "Partial",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "No",
    },
    notes: [],
  },
  {
    name: "Chroma",
    homepage: "https://www.trychroma.com",
    license: "Apache-2.0",
    architecture: "Embedding database (not an agent-memory layer)",
    storageBackend: "Local / client-server",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Yes",
      "Native SQLite": "Partial",
      "Native PostgreSQL": "No",
      "Framework-agnostic SDK": "Yes",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Partial",
      "Metadata filters": "Yes",
      "Memory compression": "No",
      "Write-time dedupe / upsert": "Partial",
      "Real-time change events": "No",
      "Embedding cache": "No",
      "Multi-writer concurrency hardening": "Partial",
      "Multi-tenant org scoping": "Partial",
      "First-party telemetry": "No",
      "Checkpoints / rollback": "No",
      "Batch remember / recall": "Partial",
      "Document ingest pipeline": "Partial",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "Partial",
    },
    notes: [],
  },
  {
    name: "Qdrant",
    homepage: "https://qdrant.tech",
    license: "Apache-2.0",
    architecture: "Vector search engine (not an agent-memory layer)",
    storageBackend: "Dedicated vector DB",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "No",
      "Native PostgreSQL": "No",
      "Framework-agnostic SDK": "Yes",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Yes",
      "Metadata filters": "Yes",
      "Memory compression": "No",
      "Write-time dedupe / upsert": "Partial",
      "Real-time change events": "Partial",
      "Embedding cache": "No",
      "Multi-writer concurrency hardening": "Yes",
      "Multi-tenant org scoping": "Yes",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "No",
      "Batch remember / recall": "Partial",
      "Document ingest pipeline": "No",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "Yes",
    },
    notes: [],
  },
  {
    name: "Weaviate",
    homepage: "https://weaviate.io",
    license: "BSD-3-Clause",
    architecture: "Vector database (not an agent-memory layer)",
    storageBackend: "Dedicated vector DB",
    productionReady: "Yes",
    features: {
      "Local-first / offline": "Partial",
      "Native SQLite": "No",
      "Native PostgreSQL": "No",
      "Framework-agnostic SDK": "Yes",
      "Model / provider agnostic": "Yes",
      "Semantic recall": "Yes",
      "Hybrid keyword + vector": "Yes",
      "Metadata filters": "Yes",
      "Memory compression": "No",
      "Write-time dedupe / upsert": "Partial",
      "Real-time change events": "Partial",
      "Embedding cache": "No",
      "Multi-writer concurrency hardening": "Yes",
      "Multi-tenant org scoping": "Yes",
      "First-party telemetry": "Partial",
      "Checkpoints / rollback": "No",
      "Batch remember / recall": "Partial",
      "Document ingest pipeline": "Partial",
      "Open source": "Yes",
      "Public reproducible storage benchmarks": "Yes",
    },
    notes: [],
  },
];

/**
 * Framework latency comparison for Wolbarg-style storage metrics.
 * Only cells with a fair, same-workload public source get numbers.
 * Everything else: "Not publicly benchmarked".
 */
export type LatencyCell = string;

export interface LatencyCompareRow {
  framework: string;
  homepage: string;
  highlight?: boolean;
  startup: LatencyCell;
  insert: LatencyCell;
  search: LatencyCell;
  retrieval: LatencyCell;
  hybrid: LatencyCell;
  concurrency: LatencyCell;
  storageBackend: string;
  openSource: string;
  productionReady: string;
  license: string;
  architecture: string;
  source: string;
}

export const LATENCY_COMPARE_ROWS: LatencyCompareRow[] = [
  {
    framework: "Wolbarg",
    homepage: "https://wolbarg.com",
    highlight: true,
    startup: "16.18 ms cold (SQLite · v0.4)",
    insert: "7.51k ops/s bulk 2k (SQLite)",
    search: "4.83 ms p95 @ 2k (SQLite)",
    retrieval: "4.12 ms p50 @ 2k (SQLite)",
    hybrid: "Covered in v4 edge suite",
    concurrency: "8.66k ops/s · 16 writers (SQLite)",
    storageBackend: "SQLite / PostgreSQL",
    openSource: "Yes (MIT)",
    productionReady: "Yes",
    license: "MIT",
    architecture: "Memory SDK",
    source: "Wolbarg v0.4.0 v4-stress suite 2026-07-18 (mock)",
  },
  {
    framework: "Mem0",
    homepage: "https://mem0.ai",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked*",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Pluggable",
    openSource: "Yes (Apache-2.0)",
    productionReady: "Yes",
    license: "Apache-2.0",
    architecture: "Memory platform",
    source:
      "Publishes LoCoMo / LongMemEval / BEAM accuracy + token cost — different workload (LLM eval).",
  },
  {
    framework: "Zep",
    homepage: "https://www.getzep.com",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked*",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Graph + vectors",
    openSource: "Partial",
    productionReady: "Yes",
    license: "Mixed",
    architecture: "Temporal graph memory",
    source:
      "Publishes LongMemEval accuracy + retrieval latency with graph prebuild — not Wolbarg storage path.",
  },
  {
    framework: "Letta",
    homepage: "https://www.letta.com",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Agent tiers",
    openSource: "Yes",
    productionReady: "Yes",
    license: "Apache-2.0",
    architecture: "Agent runtime",
    source: "No comparable Wolbarg-style storage-latency suite found.",
  },
  {
    framework: "LangGraph Memory",
    homepage: "https://langchain-ai.github.io/langgraph/",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Pluggable",
    openSource: "Yes",
    productionReady: "Yes",
    license: "MIT",
    architecture: "Agent framework memory",
    source: "No comparable storage-latency suite found.",
  },
  {
    framework: "LlamaIndex",
    homepage: "https://www.llamaindex.ai",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Pluggable",
    openSource: "Yes",
    productionReady: "Yes",
    license: "MIT",
    architecture: "RAG framework",
    source: "No comparable Wolbarg-style storage suite found.",
  },
  {
    framework: "Mastra",
    homepage: "https://mastra.ai",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Framework stores",
    openSource: "Yes",
    productionReady: "Partial",
    license: "Apache-2.0",
    architecture: "TS agent framework",
    source: "No comparable storage-latency suite found.",
  },
  {
    framework: "Chroma",
    homepage: "https://www.trychroma.com",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked*",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Embedding DB",
    openSource: "Yes",
    productionReady: "Yes",
    license: "Apache-2.0",
    architecture: "Vector database",
    source:
      "Vector-DB workload ≠ Wolbarg remember/recall API. We do not transplant ANN engine numbers.",
  },
  {
    framework: "Qdrant",
    homepage: "https://qdrant.tech",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked*",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Vector DB",
    openSource: "Yes",
    productionReady: "Yes",
    license: "Apache-2.0",
    architecture: "Vector search engine",
    source:
      "Publishes ANN RPS/latency suites (different API + dataset). See https://qdrant.tech/benchmarks/",
  },
  {
    framework: "Weaviate",
    homepage: "https://weaviate.io",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked*",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Vector DB",
    openSource: "Yes",
    productionReady: "Yes",
    license: "BSD-3-Clause",
    architecture: "Vector database",
    source:
      "Publishes ANN QPS/latency (different API). See https://docs.weaviate.io/weaviate/benchmarks/ann",
  },
  {
    framework: "Supermemory",
    homepage: "https://supermemory.ai",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked*",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Hosted memory API",
    openSource: "Partial",
    productionReady: "Yes",
    license: "Proprietary / mixed",
    architecture: "Hosted memory",
    source:
      "Publishes LongMemEval / LoCoMo accuracy claims — not storage-path SDK latency.",
  },
  {
    framework: "CrewAI Memory",
    homepage: "https://www.crewai.com",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Framework-integrated",
    openSource: "Partial",
    productionReady: "Partial",
    license: "Mixed",
    architecture: "Multi-agent framework",
    source: "No comparable storage-latency suite found.",
  },
  {
    framework: "AutoGen",
    homepage: "https://microsoft.github.io/autogen/",
    startup: "Not publicly benchmarked",
    insert: "Not publicly benchmarked",
    search: "Not publicly benchmarked",
    retrieval: "Not publicly benchmarked",
    hybrid: "Not publicly benchmarked",
    concurrency: "Not publicly benchmarked",
    storageBackend: "Framework-dependent",
    openSource: "Yes",
    productionReady: "Partial",
    license: "MIT",
    architecture: "Multi-agent framework",
    source: "No comparable storage-latency suite found.",
  },
];

export const COMPETITOR_CITATIONS = [
  {
    name: "Mem0 accuracy / tokens / p50",
    url: "https://github.com/mem0ai/mem0",
    note: "LoCoMo, LongMemEval, BEAM — LLM-judge memory quality, not storage ops/sec.",
  },
  {
    name: "Mem0 evaluation docs",
    url: "https://docs.mem0.ai/core-concepts/memory-evaluation",
    note: "Token-efficient algorithm methodology.",
  },
  {
    name: "Zep LongMemEval claims",
    url: "https://www.getzep.com/supermemory-alternative/",
    note: "Accuracy + retrieval latency with temporal graph — not Wolbarg remember/recall.",
  },
  {
    name: "Qdrant ANN benchmarks",
    url: "https://qdrant.tech/benchmarks/single-node-speed-benchmark/",
    note: "Vector engine RPS/latency on ANN datasets.",
  },
  {
    name: "Weaviate ANN benchmarks",
    url: "https://docs.weaviate.io/weaviate/benchmarks/ann",
    note: "ANN QPS / latency / recall trade-offs.",
  },
] as const;

export const COMPETITOR_LATENCY_POLICY =
  "We only place a number in a competitor latency cell when the publisher measured the same class of workload (Wolbarg-style storage/SDK path with mock or fixed embeddings). Accuracy benchmarks that include LLM judges (LoCoMo, LongMemEval, BEAM) and raw ANN engine suites (Qdrant, Weaviate) are different experiments — we cite them in footnotes but never paste them into Startup / Insert / Search cells.";

export const BENCHMARKS_REPO =
  "https://github.com/wolbarg/wolbarg-benchmarks";

export const PAGE_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "sqlite", label: "SQLite" },
  { id: "postgres", label: "PostgreSQL" },
  { id: "v04-features", label: "v0.4 features" },
  { id: "compare-backends", label: "SQLite vs PG" },
  { id: "competitors", label: "Competitors" },
  { id: "why", label: "Why it's fast" },
  { id: "credibility", label: "Two suites" },
  { id: "methodology", label: "Methodology" },
  { id: "downloads", label: "Downloads" },
] as const;


/** Markdown table for README / report generators. */
export function renderFeatureMarkdownTable(): string {
  const header = `| Feature | ${PRODUCTS.map((p) => p.name).join(" | ")} |`;
  const sep = `| --- | ${PRODUCTS.map(() => "---").join(" | ")} |`;
  const rows = FEATURE_COLUMNS.map((col) => {
    const cells = PRODUCTS.map((p) => featureMark(p.features[col])).join(" | ");
    return `| ${col} | ${cells} |`;
  });
  return [header, sep, ...rows].join("\n");
}
