# Wolbarg Benchmarks

Public, reproducible benchmarks for **[wolbarg](https://www.npmjs.com/package/wolbarg)** — local-first semantic memory for AI agents.

- **Website:** [wolbarg.com/benchmarks](https://wolbarg.com/benchmarks)
- **SDK:** [github.com/wolbarg/wolbarg](https://github.com/wolbarg/wolbarg) · [npm `wolbarg`](https://www.npmjs.com/package/wolbarg)
- **Docs:** [wolbarg.com/docs/benchmarks](https://wolbarg.com/docs/benchmarks)

These benchmarks measure the **complete Wolbarg SDK** (storage + recall path), not raw SQLite or PostgreSQL alone.

## Latest — v0.4.0 (2026-07-18)

**Suite:** `v4-stress` · **SDK:** `wolbarg@0.4.0` · **mode:** mock · dual-backend SQLite + PostgreSQL

| Metric | SQLite | PostgreSQL |
| --- | --- | --- |
| Cold `ready()` | **16.18 ms** | **91.39 ms** |
| `rememberBatch` 200 | **5,795 ops/s** | **2,795 ops/s** |
| Bulk insert 2k | **7,509 ops/s** | **4,085 ops/s** |
| Recall p95 @ 2k | **4.83 ms** | **141.5 ms** |
| 16 writers | **8,660 ops/s** | **3,335 ops/s** |
| Embedding cache spot speedup | **1.47×** | **1.18×** |
| Embedding cache call reduction | **90%** (microbench) | — |
| Multi-process SQLite (20 writers) | **0% errors · integrity OK** | — |

Artifacts: [`results/v0.4.0/`](results/v0.4.0/)

> **Storage suite = mock embeddings.** Absolute ops/sec vary by machine. LIVE provider-path numbers are a separate suite — do not mix.

Full charts and competitor matrix: [wolbarg.com/benchmarks](https://wolbarg.com/benchmarks)

## Environment (v0.4.0)

| Key | Value |
| --- | --- |
| Node | v24.13.1 |
| Platform | win32/arm64 |
| CPUs | 8 |
| SDK | wolbarg@0.4.0 |
| Suite | v4-stress |
| Mode | mock |
| Generated | 2026-07-18 |

## Feature comparison (agent-memory axes)

Updated for 0.4 capabilities: write-time dedupe/upsert, real-time change events, embedding cache, multi-writer concurrency hardening, telemetry, checkpoints, and dual native backends.

See [`comparison/features.ts`](comparison/features.ts) and the capability matrix on the website.

## Historical — v2.0.0 / 0.3.x (2026-07-15)

Previous quick-scale dual-backend publish remains under [`results/benchmark.json`](results/benchmark.json) and [`results/SUMMARY.md`](results/SUMMARY.md).

```bash
npm install
npm run benchmark
```

## Reproduce

```bash
git clone https://github.com/wolbarg/wolbarg-benchmarks.git
cd wolbarg-benchmarks
npm install
npm run benchmark
```

Prefer recording: date, SDK version (`wolbarg@0.4.0`), Node version, CPU/RAM, mode (`mock`/`live`), backends, and git SHA.

## License

MIT — see [LICENSE](LICENSE).
