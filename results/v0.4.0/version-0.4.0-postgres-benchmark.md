# Wolbarg v0.4.0 · postgres benchmark

Generated: `2026-07-18T17:33:10.853Z`

## Summary

| | |
|---|---|
| Suite | v4-stress (mock) |
| Backend | **postgres** |
| Schema | v4 |
| Result | 21 pass / 0 fail / 4 skip (25 total) |
| Wall time | 5795.9 ms |
| Runtime | v24.13.1 · win32/arm64 · 8 CPUs |

## Headlines

| Metric | Value |
|---|---|
| `coldReadyMs` | 91.39 |
| `batchOpsPerSec` | 2795 |
| `cacheSpeedup` | 1.18 |
| `bulk2kInsertOpsSec` | 4084.7 |
| `recallP95Ms` | 141.5 |
| `conc16Throughput` | 3334.8 |
| `conc16P95Ms` | 9.48 |

## Startup & schema

| Case | Status | ms | Metrics |
|---|---|---|---|
| cold ready() | ✅ pass | 91.9 | coldReadyMs=91.39 |
| warm ready() reopen | ✅ pass | 149.7 | warmReadyMs=59.89 |
| schema_version is 4 | ⏭ skip | 0.0 | SQLite-only meta check |

## v0.4 feature coverage

| Case | Status | ms | Metrics |
|---|---|---|---|
| rememberBatch append throughput | ✅ pass | 146.7 | count=200, ms=71.56, opsPerSec=2795 |
| embedding cache hit rate (repeated texts) | ✅ pass | 247.5 | coldAvgMs=0.77, hotAvgMs=0.66, speedup=1.18 |
| exact dedupe upsert + metadata merge | ✅ pass | 81.2 | action=updated, active=1 |
| dedupe off creates duplicates | ✅ pass | 67.6 | distinct=true |
| subscribe delivers remember/update/forget | ✅ pass | 308.6 | events=remember,update,remember,forget |
| throwing subscriber does not break writes | ✅ pass | 113.5 | ok=true |
| telemetry records operations | ⏭ skip | 0.0 | SQLite-only EventDatabase |
| checkpoint create / no-overwrite / rollback | ⏭ skip | 0.0 | SQLite file snapshots |
| export / import round-trip | ⏭ skip | 0.0 | SQLite file transfer |

## Edge cases

| Case | Status | ms | Metrics |
|---|---|---|---|
| clear requires confirm | ✅ pass | 96.3 | ok=true |
| empty corpus recall returns [] | ✅ pass | 125.3 | hits=0 |
| org / agent isolation | ✅ pass | 146.1 | ok=true |
| unicode + large metadata | ✅ pass | 72.8 | hits=1 |
| metadata filter eq + and/or | ✅ pass | 80.0 | eq=2, and=1 |
| hybrid recall + compress strips ANN | ✅ pass | 84.6 | hybridHits=2, archived=2, summaryAlive=true |
| forget-by-agent + clear integrity | ✅ pass | 126.0 | afterAgentForget=15, afterClear=0 |
| concurrent exact-dedupe race stays unique | ✅ pass | 195.9 | ids=1, updates=11 |

## Stress & concurrency

| Case | Status | ms | Metrics |
|---|---|---|---|
| bulk insert 2k + search latency | ✅ pass | 1813.4 | inserted=2000, insertMs=489.6, insertOpsSec=4084.7, recallP50Ms=23.29, recallP95Ms=141.5, active=2000 |
| concurrency 8 writers × 20 ops | ✅ pass | 189.4 | writers=8, throughput=2555.4, p95Ms=8.51, failures=0 |
| concurrency 16 writers × 20 ops | ✅ pass | 197.0 | writers=16, throughput=3334.8, p95Ms=9.48, failures=0 |
| concurrency 32 writers × 20 ops | ✅ pass | 275.2 | writers=32, throughput=3801.5, p95Ms=14.77, failures=0 |
| mixed read/write storm | ✅ pass | 1185.0 | wallMs=387, failures=0 |

## Notes

- Suite covers Wolbarg v0.4 schema: startup, feature coverage, edge cases, and stress/concurrency.
- Mock embeddings are intentional for repeatable stress numbers; absolute ops/sec vary by machine and Postgres RTT.
- JSON twin: `version-0.4.0-postgres-benchmark.json`
