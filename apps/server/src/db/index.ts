


import { env } from "../cloudflare-env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function getDb() {
	const sql = postgres(env.HYPERDRIVE.connectionString, {
		max: 5,
		fetch_types: false,
	});
	return drizzle(sql);
};
