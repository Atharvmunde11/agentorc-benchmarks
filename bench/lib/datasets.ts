/**
 * Shared on-disk corpora — build each size once, reuse across benches.
 */

import { existsSync } from "node:fs";
import type { AgentOrc } from "agentorc";
import type { BenchContext } from "./types.ts";
import {
  createClient,
  dbPathFor,
  ensureCleanDb,
  populateDataset,
} from "./harness.ts";

const ready = new Map<number, string>();
const inflight = new Map<number, Promise<string>>();

export async function ensureDataset(
  ctx: BenchContext,
  size: number,
): Promise<string> {
  const cached = ready.get(size);
  if (cached && existsSync(cached)) return cached;

  const existing = inflight.get(size);
  if (existing) return existing;

  const promise = (async () => {
    const path = dbPathFor(ctx, `corpus-${size}`);
    ensureCleanDb(path);
    console.log(`    ⟳ building shared corpus (${size} memories)`);
    const client = await createClient(ctx, path);
    try {
      await populateDataset(client, size, { startSeed: size * 1_000 });
    } finally {
      await client.close();
    }
    ready.set(size, path);
    inflight.delete(size);
    return path;
  })();

  inflight.set(size, promise);
  return promise;
}

export async function openDataset(
  ctx: BenchContext,
  size: number,
): Promise<{ client: AgentOrc; path: string }> {
  const path = await ensureDataset(ctx, size);
  const client = await createClient(ctx, path);
  return { client, path };
}
