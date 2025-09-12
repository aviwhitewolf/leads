import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "../db";
import * as schema from "../db/schema/auth";
import { runtimeEnv, type Env } from "./env";

type AuthDeps = {
	env?: Env; // allow override for tests
	db?: ReturnType<typeof createDb>;
};

export function createAuth(deps: AuthDeps = {}) {
	const env = deps.env ?? runtimeEnv;
	const database = deps.db ?? createDb(env.HYPERDRIVE);

	return betterAuth({
		database: drizzleAdapter(database, {
			provider: "pg",
			schema: schema,
		}),
		trustedOrigins: [env.CORS_ORIGIN],
		emailAndPassword: { enabled: true },
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
			database: { generateId: false },
		},
	});
}

// Backwards compatibility export
export const auth = () => createAuth();
