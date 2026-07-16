/**
 * Feature comparison — public docs only.
 * Values: Yes | No | Partial | Unknown
 * Never invent performance numbers.
 *
 * "Memory Compression" means summarizing / condensing agent memories,
 * not vector quantization.
 */

export type FeatureValue = "Yes" | "No" | "Partial" | "Unknown";

/** Instant-scan marks for tables (professional + readable at a glance). */
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

export const FEATURE_COLUMNS = [
  "SQLite-based",
  "Local-first",
  "Framework Agnostic",
  "Model Agnostic",
  "Memory Compression",
  "Semantic Search",
  "Hybrid Search",
  "Open Source",
  "Runs Offline",
  "Storage Adapter",
  "Provider Adapter",
  "Public Benchmark Repo",
] as const;

export type FeatureColumn = (typeof FEATURE_COLUMNS)[number];

export interface ProductFeatures {
  name: string;
  homepage: string;
  features: Record<string, FeatureValue>;
  notes: string[];
}

/**
 * Sources consulted (public docs / repos only):
 * - Wolbarg: SDK README + source (Atharvmunde11/wolbarg)
 * - Chroma: cookbook.chromadb.dev storage + concepts; trychroma.com
 * - Qdrant: qdrant.tech docs (hybrid queries, edge, open source)
 * - LanceDB: docs.lancedb.com (search / hybrid search)
 * - Mem0: mem0.ai + open-source Node quickstart (local defaults, pluggable stores)
 */
export const PRODUCTS: ProductFeatures[] = [
  {
    name: "Wolbarg",
    homepage: "https://wolbarg.com",
    features: {
      "SQLite-based": "Yes",
      "Local-first": "Yes",
      "Framework Agnostic": "Yes",
      "Model Agnostic": "Yes",
      "Memory Compression": "Yes",
      "Semantic Search": "Yes",
      "Hybrid Search": "No",
      "Open Source": "Yes",
      "Runs Offline": "Yes",
      "Storage Adapter": "Partial",
      "Provider Adapter": "Yes",
      "Public Benchmark Repo": "Yes",
    },
    notes: [
      "Storage today is SQLite; PostgreSQL is planned.",
      "Runs offline when you point embeddings/LLM at a local provider (e.g. Ollama).",
      "Hybrid (keyword + vector) search is not in v1.",
    ],
  },
  {
    name: "Chroma",
    homepage: "https://www.trychroma.com",
    features: {
      "SQLite-based": "Partial",
      "Local-first": "Yes",
      "Framework Agnostic": "Yes",
      "Model Agnostic": "Yes",
      "Memory Compression": "Unknown",
      "Semantic Search": "Yes",
      "Hybrid Search": "Partial",
      "Open Source": "Yes",
      "Runs Offline": "Yes",
      "Storage Adapter": "Yes",
      "Provider Adapter": "Yes",
      "Public Benchmark Repo": "Unknown",
    },
    notes: [
      "Single-node deployments use SQLite for metadata; vector segments are separate.",
      "Hybrid / multi-retriever fusion appears in newer query planning docs; treat as Partial.",
    ],
  },
  {
    name: "Qdrant",
    homepage: "https://qdrant.tech",
    features: {
      "SQLite-based": "No",
      "Local-first": "Partial",
      "Framework Agnostic": "Yes",
      "Model Agnostic": "Yes",
      "Memory Compression": "No",
      "Semantic Search": "Yes",
      "Hybrid Search": "Yes",
      "Open Source": "Yes",
      "Runs Offline": "Yes",
      "Storage Adapter": "Partial",
      "Provider Adapter": "Yes",
      "Public Benchmark Repo": "Unknown",
    },
    notes: [
      "Typically runs as a server (Docker) or Qdrant Edge in-process — not a SQLite file SDK.",
      "Offers vector quantization; that is not the same as agent memory summarization.",
      "Documented dense + sparse hybrid search.",
    ],
  },
  {
    name: "LanceDB",
    homepage: "https://lancedb.com",
    features: {
      "SQLite-based": "No",
      "Local-first": "Yes",
      "Framework Agnostic": "Yes",
      "Model Agnostic": "Yes",
      "Memory Compression": "Unknown",
      "Semantic Search": "Yes",
      "Hybrid Search": "Yes",
      "Open Source": "Yes",
      "Runs Offline": "Yes",
      "Storage Adapter": "Partial",
      "Provider Adapter": "Yes",
      "Public Benchmark Repo": "Unknown",
    },
    notes: [
      "Embedded OSS on the Lance columnar format.",
      "Documented hybrid vector + full-text search.",
    ],
  },
  {
    name: "Mem0",
    homepage: "https://mem0.ai",
    features: {
      "SQLite-based": "Partial",
      "Local-first": "Partial",
      "Framework Agnostic": "Yes",
      "Model Agnostic": "Yes",
      "Memory Compression": "Yes",
      "Semantic Search": "Yes",
      "Hybrid Search": "Partial",
      "Open Source": "Yes",
      "Runs Offline": "Partial",
      "Storage Adapter": "Yes",
      "Provider Adapter": "Yes",
      "Public Benchmark Repo": "Unknown",
    },
    notes: [
      "OSS supports local defaults (incl. SQLite history) and pluggable vector stores; hosted platform is also offered.",
      "Markets memory extraction / condensation for token savings.",
    ],
  },
];

export function renderFeatureMarkdownTable(): string {
  const header = `| Feature | ${PRODUCTS.map((p) => p.name).join(" | ")} |`;
  const sep = `| --- | ${PRODUCTS.map(() => "---").join(" | ")} |`;
  const rows = FEATURE_COLUMNS.map((col) => {
    const cells = PRODUCTS.map((p) =>
      featureMark((p.features[col] ?? "Unknown") as FeatureValue),
    );
    return `| ${col} | ${cells.join(" | ")} |`;
  });
  return [header, sep, ...rows].join("\n");
}
