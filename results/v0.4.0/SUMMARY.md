# Wolbarg v0.4.0 results summary

Generated: 2026-07-18

## Sources

| File | Contents |
| --- | --- |
| `version-0.4.0-sqlite-benchmark.json` / `.md` | Full v4-stress suite (SQLite) |
| `version-0.4.0-postgres-benchmark.json` / `.md` | Full v4-stress suite (Postgres) |
| `embedding-cache.json` | Provider-call reduction microbench |
| `multiprocess-concurrency.json` | Multi-process SQLite writers 2–20 |

## Headlines

| Metric | SQLite | Postgres |
| --- | --- | --- |
| coldReadyMs | 16.18 | 91.39 |
| batchOpsPerSec | 5795.2 | 2795 |
| bulk2kInsertOpsSec | 7509 | 4084.7 |
| recallP95Ms | 4.83 | 141.5 |
| conc16Throughput | 8660 | 3334.8 |
| cacheSpeedup | 1.47 | 1.18 |

## Notes

- Mock embeddings isolate SDK + database performance.
- Postgres skips SQLite-only checks (file telemetry DB, file checkpoints, export/import).
- Multi-process suite is SQLite-only (separate OS processes, shared file, BEGIN IMMEDIATE + retry).
