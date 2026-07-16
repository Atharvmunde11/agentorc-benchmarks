# Contributing to Wolbarg Benchmarks

Thanks for helping keep the public numbers trustworthy.

## Quick start

```bash
npm install
npm run benchmark:quick
```

## Adding a benchmark

1. Create `bench/your-bench.ts` that exports `runXxxBenchmark(ctx)`.
2. Use `sectionWrapper()` and fill in **what / why / how** in plain English.
3. Register it in `bench/index.ts`.
4. Prefer shared helpers in `bench/lib/` — avoid copying timing or client setup.
5. Keep summary `result` strings short. Put samples and paths in `details` only.

## Modes

| Command | Meaning |
| --- | --- |
| `npm run benchmark` | Full mock suite |
| `npm run benchmark:quick` | Smaller datasets (used in CI) |
| `npm run benchmark:live` | Uses `.env` embedding/LLM keys |
| `npm run charts` | Rebuild charts from `results/benchmark.json` |

## Rules

- Do **not** invent competitor performance numbers.
- Feature comparison values may only be Yes / No / Partial / Unknown with public sources.
- Do not commit `.env` or `data/*.db`.
- Prefer clear wording over jargon.

## Pull requests

- Include before/after summary rows when numbers change.
- CI runs `benchmark:quick` and uploads artifacts.
