import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { Env } from "../lib/env";

/**
 * Create a Drizzle DB instance from a Hyperdrive binding.
 * Keep a single connection per request to avoid leaks in Workers.
 * Modify this file to remove the cloudflare dependencies if you want to use with other applications.
 */
export function createDb(hd: Hyperdrive) {
  const client = postgres(hd.connectionString, {
    max: 1,
    connect_timeout: 10,
    prepare: false,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    transform: { undefined: null },
    onnotice: () => {},
  });
  return drizzle(client);
}

// Backwards-compatible helper if existing code imports { db }
export const db = (env: Env) => createDb(env.HYPERDRIVE);