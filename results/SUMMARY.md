# Wolbarg Benchmarks Summary (v0.2.1)

Generated **2026-07-15T13:59:16.872Z** · suite v2.0.0 · mode `mock` · scale `quick` · backends `sqlite, postgres`

Storage (mock) ≠ LIVE (real providers). Full charts: [/benchmarks](/benchmarks) · methodology: [/docs/benchmarks](/docs/benchmarks) · raw: [benchmark.json](./benchmark.json) · [benchmark.md](./benchmark.md).

Published artifact covers corpora **100** and **1k** only.

## Headline numbers

| Metric | Result |
| --- | --- |
| SQLite search @ 1k | 2.02 ms |
| SQLite insert @ 1k | 1.72k ops/sec |
| SQLite cold start | 7.91 ms |
| Postgres 16 writers | 1.12k ops/sec |

## Summary

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Startup | Cold | sqlite | 7.91 ms |
| Startup | Warm | sqlite | 4.33 ms |
| Compression | 50 | sqlite | 98.00% |
| Compression | 200 | sqlite | 99.50% |
| Concurrency | 2 writers | sqlite | 1.70k ops/sec |
| Concurrency | 4 writers | sqlite | 1.60k ops/sec |
| Concurrency | 8 writers | sqlite | 1.58k ops/sec |
| Concurrency | 16 writers | sqlite | 907.05 ops/sec |
| Memory Usage | baseline (pre-init) | sqlite | heap 28.36 MB / rss 114.89 MB |
| Memory Usage | after init | sqlite | heap 28.42 MB / rss 114.93 MB |
| Memory Usage | after 100 inserts | sqlite | heap 17.16 MB / rss 114.19 MB |
| Memory Usage | after 1000 inserts | sqlite | heap 26.82 MB / rss 105.88 MB |
| Memory Usage | after recall | sqlite | heap 16.86 MB / rss 111.35 MB |
| Memory Usage | after close | sqlite | heap 16.87 MB / rss 111.36 MB |
| Database Size | 100 | sqlite | 376.00 KB |
| Database Size | 1000 | sqlite | 2.98 MB |
| Search | 100 | sqlite | 893.1 µs |
| Search | 1000 | sqlite | 2.02 ms |
| Retrieval top-5 | 1000 | sqlite | 2.16 ms |
| Retrieval top-10 | 1000 | sqlite | 1.56 ms |
| Retrieval top-20 | 1000 | sqlite | 1.84 ms |
| Insert | 100 | sqlite | 1.85k ops/sec |
| Insert | 1000 | sqlite | 1.72k ops/sec |
| Hybrid · semantic | 1000 | sqlite | 2.30 ms |
| Hybrid · hybrid-default | 1000 | sqlite | 2.81 ms |
| Hybrid · hybrid-0.5/0.5 | 1000 | sqlite | 2.22 ms |
| Filter · unfiltered | 1000 | sqlite | 2.26 ms |
| Filter · agent-filter | 1000 | sqlite | 1.41 ms |
| Filter · meta.eq | 1000 | sqlite | 2.60 ms |
| Filter · meta.and/or | 1000 | sqlite | 1.53 ms |
| MMR/Rerank · baseline | 1000 | sqlite | 5.10 ms |
| MMR/Rerank · mmr | 1000 | sqlite | 2.33 ms |
| MMR/Rerank · mmr-lambda-0.7 | 1000 | sqlite | 2.78 ms |
| MMR/Rerank · rerank-flag | 1000 | sqlite | 1.66 ms |
| Ingest · inline-markdown | 3 chunks | sqlite | 3.77 ms |
| Ingest · inline-json | 5 chunks | sqlite | 9.73 ms |
| Ingest · sample.md | 1 chunks | sqlite | 2.67 ms |
| Ingest · sample.txt | 1 chunks | sqlite | 1.48 ms |
| Ingest · sample.pdf | 1 chunks | sqlite | 230.35 ms |
| Ingest · sample.docx | 1 chunks | sqlite | 218.55 ms |
| Chunking · fixed | fixed-doc | sqlite | 2.43 ms |
| Chunking · sentence | fixed-doc | sqlite | 2.92 ms |
| Chunking · markdown | fixed-doc | sqlite | 2.62 ms |
| Forget · by id batch | 50 ids | sqlite | 31.89 ms |
| Forget · by agent | engineering | sqlite | 5.06 ms |
| Clear · organization | 200 | sqlite | 18.55 ms |
| Startup | Cold | postgres | 52.95 ms |
| Startup | Warm | postgres | 63.64 ms |
| Compression | 50 | postgres | 98.00% |
| Compression | 200 | postgres | 99.50% |
| Concurrency | 2 writers | postgres | 295.88 ops/sec |
| Concurrency | 4 writers | postgres | 438.97 ops/sec |
| Concurrency | 8 writers | postgres | 554.12 ops/sec |
| Concurrency | 16 writers | postgres | 1.12k ops/sec |
| Memory Usage | baseline (pre-init) | postgres | heap 31.47 MB / rss 145.62 MB |
| Memory Usage | after init | postgres | heap 31.75 MB / rss 145.65 MB |
| Memory Usage | after 100 inserts | postgres | heap 40.18 MB / rss 146.79 MB |
| Memory Usage | after 1000 inserts | postgres | heap 39.20 MB / rss 147.60 MB |
| Memory Usage | after recall | postgres | heap 39.37 MB / rss 147.68 MB |
| Memory Usage | after close | postgres | heap 39.38 MB / rss 147.71 MB |
| Database Size | 100 | postgres | 33.83 MB |
| Database Size | 1000 | postgres | 37.51 MB |
| Search | 100 | postgres | 5.97 ms |
| Search | 1000 | postgres | 4.70 ms |
| Retrieval top-5 | 1000 | postgres | 4.47 ms |
| Retrieval top-10 | 1000 | postgres | 5.41 ms |
| Retrieval top-20 | 1000 | postgres | 7.49 ms |
| Insert | 100 | postgres | 258.16 ops/sec |
| Insert | 1000 | postgres | 288.52 ops/sec |
| Hybrid · semantic | 1000 | postgres | 4.66 ms |
| Hybrid · hybrid-default | 1000 | postgres | 17.97 ms |
| Hybrid · hybrid-0.5/0.5 | 1000 | postgres | 10.31 ms |
| Filter · unfiltered | 1000 | postgres | 4.50 ms |
| Filter · agent-filter | 1000 | postgres | 2.54 ms |
| Filter · meta.eq | 1000 | postgres | 4.20 ms |
| Filter · meta.and/or | 1000 | postgres | 4.26 ms |
| MMR/Rerank · baseline | 1000 | postgres | 4.64 ms |
| MMR/Rerank · mmr | 1000 | postgres | 3.30 ms |
| MMR/Rerank · mmr-lambda-0.7 | 1000 | postgres | 3.19 ms |
| MMR/Rerank · rerank-flag | 1000 | postgres | 3.36 ms |
| Ingest · inline-markdown | 3 chunks | postgres | 14.06 ms |
| Ingest · inline-json | 5 chunks | postgres | 18.36 ms |
| Ingest · sample.md | 1 chunks | postgres | 9.86 ms |
| Ingest · sample.txt | 1 chunks | postgres | 9.19 ms |
| Ingest · sample.pdf | 1 chunks | postgres | 22.31 ms |
| Ingest · sample.docx | 1 chunks | postgres | 14.68 ms |
| Chunking · fixed | fixed-doc | postgres | 24.10 ms |
| Chunking · sentence | fixed-doc | postgres | 21.95 ms |
| Chunking · markdown | fixed-doc | postgres | 15.82 ms |
| Forget · by id batch | 50 ids | postgres | 200.35 ms |
| Forget · by agent | engineering | postgres | 35.13 ms |
| Clear · organization | 200 | postgres | 230.46 ms |
