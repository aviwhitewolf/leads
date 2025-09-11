import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "cloudflare:workers";
import postgres from "postgres";

export const db = () => drizzle(postgres(env.HYPERDRIVE.connectionString, {
    max: 5,
    connect_timeout: 10,
    prepare: false, // Recommended for Cloudflare Workers
    idle_timeout: 20, // Close idle connections quickly
    max_lifetime: 60 * 30, // 30 minutes max connection lifetime
    transform: {
      undefined: null, // Convert undefined to null for PostgreSQL
    },
    onnotice: () => {}, // Suppress notices in Workers
  }));