# Agent ORC Benchmarks

Public, reproducible benchmarks for **[agentOrc](https://www.npmjs.com/package/agentorc)** — local-first semantic memory for AI agents.

- **Website:** [AgentOrc.lucareo.com/benchmarks](https://AgentOrc.lucareo.com/benchmarks)
- **SDK:** [github.com/Atharvmunde11/agentOrc](https://github.com/Atharvmunde11/agentOrc) · [npm `agentorc`](https://www.npmjs.com/package/agentorc)
- **Docs:** [AgentOrc.lucareo.com](https://AgentOrc.lucareo.com)

These benchmarks measure the **complete Agent ORC SDK**, not raw SQLite.

```bash
npm install
npm run benchmark
```

## Environment

| Key | Value |
| --- | --- |
| Node | v24.13.1 |
| Platform | win32/arm64 |
| CPUs | 8 |
| RAM | 15.61 GB |
| Mode | mock |
| Adapter | SQLite |
| Generated | 2026-07-14T11:25:28.934Z |

## Summary

| Benchmark | Dataset | Result |
| --- | --- | --- |
| Startup | Cold | 8.63 ms |
| Startup | Warm | 3.35 ms |
| Active Memory Reduction | 50 | 98.04% |
| Active Memory Reduction | 200 | 99.50% |
| Active Memory Reduction | 500 | 99.50% |
| Active Memory Reduction | 1000 | 99.50% |
| Concurrency | 10 writers | 2.64k ops/sec |
| Concurrency | 50 writers | 2.96k ops/sec |
| Concurrency | 100 writers | 2.63k ops/sec |
| Memory Usage | baseline (pre-init) | heap 14.02 MB / rss 81.21 MB |
| Memory Usage | after init | heap 14.09 MB / rss 81.27 MB |
| Memory Usage | after 100 inserts | heap 18.55 MB / rss 81.31 MB |
| Memory Usage | after 1000 inserts | heap 19.41 MB / rss 81.95 MB |
| Memory Usage | after 10000 inserts | heap 20.12 MB / rss 103.14 MB |
| Memory Usage | after recall | heap 31.19 MB / rss 136.27 MB |
| Memory Usage | after close | heap 31.19 MB / rss 136.24 MB |
| Database Size | 100 | 316.00 KB |
| Database Size | 1000 | 2.64 MB |
| Database Size | 10000 | 25.96 MB |
| Database Size | 100000 | 260.79 MB |
| Search | 100 | 722.7 µs |
| Search | 1000 | 11.65 ms |
| Search | 10000 | 100.84 ms |
| Search | 100000 | 1.12 s |
| Retrieval top-5 | 1000 | 8.33 ms |
| Retrieval top-10 | 1000 | 11.39 ms |
| Retrieval top-20 | 1000 | 9.61 ms |
| Retrieval top-5 | 10000 | 107.26 ms |
| Retrieval top-10 | 10000 | 105.44 ms |
| Retrieval top-20 | 10000 | 127.77 ms |
| Retrieval top-5 | 100000 | 1.43 s |
| Retrieval top-10 | 100000 | 1.27 s |
| Retrieval top-20 | 100000 | 968.21 ms |
| Insert | 100 | 2.03k ops/sec |
| Insert | 1000 | 2.54k ops/sec |
| Insert | 10000 | 2.39k ops/sec |
| Insert | 100000 | 2.02k ops/sec |

## Performance Charts

### Insert Throughput

![insert-throughput](results/charts/insert-throughput.svg)

### Search Latency

![search-latency](results/charts/search-latency.svg)

### Retrieval Latency

![retrieval-latency](results/charts/retrieval-latency.svg)

### Database Size

![database-size](results/charts/database-size.svg)

### Memory Usage

![memory-usage](results/charts/memory-usage.svg)

### Startup Time

![startup-time](results/charts/startup-time.svg)

### Concurrency Throughput

![concurrency-throughput](results/charts/concurrency-throughput.svg)

### Compression Ratio

![compression-ratio](results/charts/compression-ratio.svg)


## Methodology

Every suite answers three questions in plain English:

1. **What is being measured?**
2. **Why does it matter?**
3. **How was it measured?**

Full write-ups live in [`results/benchmark.md`](results/benchmark.md).

### Active memory reduction (compression)

Compression shrinks the **active working set**.

- Archived memories **remain on disk**
- Storage size does **not** shrink
- Only active working memory is reduced

### Modes

| Mode | Command | Use when |
| --- | --- | --- |
| Mock (default) | `npm run benchmark` | Reproduce SDK numbers without API cost |
| Live | `npm run benchmark:live` | Measure with your own embedding/LLM keys |
| Quick | `npm run benchmark:quick` | Smaller datasets for CI / smoke tests |

Storage adapter today: **SQLite**. PostgreSQL is reserved for a future SDK adapter.

## How to compare tools

Feature comparison only — **no invented speed numbers**.

**Legend:** ✅ Supported · ⚠️ Partial · ❌ No · ❓ Unknown

| Feature | Agent ORC | Chroma | Qdrant | LanceDB | Mem0 |
| --- | --- | --- | --- | --- | --- |
| SQLite-based | ✅ | ⚠️ | ❌ | ❌ | ⚠️ |
| Local-first | ✅ | ✅ | ⚠️ | ✅ | ⚠️ |
| Framework Agnostic | ✅ | ✅ | ✅ | ✅ | ✅ |
| Model Agnostic | ✅ | ✅ | ✅ | ✅ | ✅ |
| Memory Compression | ✅ | ❓ | ❌ | ❓ | ✅ |
| Semantic Search | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hybrid Search | ❌ | ⚠️ | ✅ | ✅ | ⚠️ |
| Open Source | ✅ | ✅ | ✅ | ✅ | ✅ |
| Runs Offline | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Storage Adapter | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ |
| Provider Adapter | ✅ | ✅ | ✅ | ✅ | ✅ |
| Public Benchmark Repo | ✅ | ❓ | ❓ | ❓ | ❓ |

Based on public documentation only. See [`comparison/features.ts`](comparison/features.ts) for notes.

Website: [AgentOrc.lucareo.com/benchmarks](https://AgentOrc.lucareo.com/benchmarks) · npm: [`agentorc`](https://www.npmjs.com/package/agentorc)

## How to reproduce

```bash
git clone https://github.com/Atharvmunde11/agentorc-benchmarks.git
cd agentorc-benchmarks
npm install
npm run benchmark        # full suite
npm run charts           # regenerate charts from results/benchmark.json
```

Requires **Node.js 22.5+**.

Detailed JSON: [`results/benchmark.json`](results/benchmark.json)

## How to contribute

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
