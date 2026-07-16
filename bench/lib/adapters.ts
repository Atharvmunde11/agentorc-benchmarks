/**
 * Storage adapters.
 * SQLite is implemented today. PostgreSQL is reserved for a future SDK adapter.
 */

import type { StorageAdapterName } from "./types.ts";

export function resolveAdapter(
  name: string | undefined = process.env.DATABASE_ADAPTER,
): StorageAdapterName {
  const value = (name ?? "sqlite").toLowerCase();
  if (value === "postgres" || value === "postgresql") {
    return "postgres";
  }
  if (value === "sqlite") return "sqlite";
  throw new Error(`Unknown storage adapter: ${name}`);
}

export function assertAdapterSupported(adapter: StorageAdapterName): void {
  if (adapter === "postgres") {
    throw new Error(
      "PostgreSQL adapter is not available yet. Wolbarg v1 ships SQLite only. Set DATABASE_ADAPTER=sqlite.",
    );
  }
}

export function adapterLabel(adapter: StorageAdapterName | undefined): string {
  if (!adapter || adapter === "sqlite") return "SQLite";
  return "PostgreSQL (planned)";
}
