import { env } from "@/cloudflare-env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let client: ReturnType<typeof postgres> | null = null;

/* 
Modify this function to change database connection logic. 
For example, you could implement a connection pool here. 
Right now, it creates a new connection on every call with cloudflare hyperdrive. 
Which will not be compatible with other serverless environments or normal environments. 
*/
export function getDb() {
  if (!client) {
    if (env.HYPERDRIVE) {
      // Running in Cloudflare Workers with Hyperdrive binding
      client = postgres(env.HYPERDRIVE.connectionString, {
        max: 5,
        fetch_types: false,
      });
    } else if (env.DATABASE_URL) {
      // Local dev / Node / Next.js fallback
      client = postgres(env.DATABASE_URL, {
        max: 5,
        fetch_types: false,
      });
    } else {
      throw new Error(
        "No database configuration found. Provide either HYPERDRIVE (Workers) or DATABASE_URL (local)."
      );
    }
  }

  return drizzle(client);
}
