# Wolbarg v0.4.0 · sqlite benchmark

Generated: `2026-07-18T17:33:03.832Z`

## Summary

| | |
|---|---|
| Suite | v4-stress (mock) |
| Backend | **sqlite** |
| Schema | v4 |
| Result | 25 pass / 0 fail / 0 skip (25 total) |
| Wall time | 1199.8 ms |
| Runtime | v24.13.1 · win32/arm64 · 8 CPUs |

## Headlines

| Metric | Value |
|---|---|
| `coldReadyMs` | 16.18 |
| `batchOpsPerSec` | 5795.2 |
| `cacheSpeedup` | 1.47 |
| `bulk2kInsertOpsSec` | 7509 |
| `recallP95Ms` | 4.83 |
| `conc16Throughput` | 8660 |
| `conc16P95Ms` | 2.46 |

## Startup & schema

| Case | Status | ms | Metrics |
|---|---|---|---|
| cold ready() | ✅ pass | 19.6 | coldReadyMs=16.18 |
| warm ready() reopen | ✅ pass | 20.2 | warmReadyMs=1.87 |
| schema_version is 4 | ✅ pass | 14.9 | schemaVersion=4 |

## v0.4 feature coverage

| Case | Status | ms | Metrics |
|---|---|---|---|
| rememberBatch append throughput | ✅ pass | 50.7 | count=200, ms=34.51, opsPerSec=5795.2 |
| embedding cache hit rate (repeated texts) | ✅ pass | 74.1 | coldAvgMs=0.34, hotAvgMs=0.23, speedup=1.47 |
| exact dedupe upsert + metadata merge | ✅ pass | 11.2 | action=updated, active=1 |
| dedupe off creates duplicates | ✅ pass | 10.1 | distinct=true |
| subscribe delivers remember/update/forget | ✅ pass | 11.4 | events=remember,update,remember,forget |
| throwing subscriber does not break writes | ✅ pass | 10.1 | ok=true |
| telemetry records operations | ✅ pass | 80.2 | events=4 |
| checkpoint create / no-overwrite / rollback | ✅ pass | 60.4 | checkpoint=snap1, rolledBackTo=1 |
| export / import round-trip | ✅ pass | 21.3 | hits=1, exported=true |

## Edge cases

| Case | Status | ms | Metrics |
|---|---|---|---|
| clear requires confirm | ✅ pass | 11.1 | ok=true |
| empty corpus recall returns [] | ✅ pass | 8.8 | hits=0 |
| org / agent isolation | ✅ pass | 20.9 | ok=true |
| unicode + large metadata | ✅ pass | 10.9 | hits=1 |
| metadata filter eq + and/or | ✅ pass | 11.4 | eq=2, and=1 |
| hybrid recall + compress strips ANN | ✅ pass | 14.3 | hybridHits=2, archived=2, summaryAlive=true |
| forget-by-agent + clear integrity | ✅ pass | 16.4 | afterAgentForget=15, afterClear=0 |
| concurrent exact-dedupe race stays unique | ✅ pass | 17.5 | ids=1, updates=11 |

## Stress & concurrency

| Case | Status | ms | Metrics |
|---|---|---|---|
| bulk insert 2k + search latency | ✅ pass | 395.6 | inserted=2000, insertMs=266.3, insertOpsSec=7509, recallP50Ms=4.12, recallP95Ms=4.83, active=2000 |
| concurrency 8 writers × 20 ops | ✅ pass | 39.0 | writers=8, throughput=6084.2, p95Ms=3.05, failures=0 |
| concurrency 16 writers × 20 ops | ✅ pass | 51.9 | writers=16, throughput=8660, p95Ms=2.46, failures=0 |
| concurrency 32 writers × 20 ops | ✅ pass | 109.3 | writers=32, throughput=6798, p95Ms=22.94, failures=0 |
| mixed read/write storm | ✅ pass | 102.3 | wallMs=73.2, failures=0 |

## Notes

- Suite covers Wolbarg v0.4 schema: startup, feature coverage, edge cases, and stress/concurrency.
- Mock embeddings are intentional for repeatable stress numbers; absolute ops/sec vary by machine and Postgres RTT.
- JSON twin: `version-0.4.0-sqlite-benchmark.json`
