
import type { Context as HonoContext } from "hono";
import { auth, createAuth } from "./auth";
import { createDb } from "../db";
import { runtimeEnv } from "./env";

export type CreateContextOptions = {
	context: HonoContext;
};


export async function createContext({ context }: CreateContextOptions) {
	const db = createDb(runtimeEnv.HYPERDRIVE);
	const authInstance = createAuth({ db });
	const session = await authInstance.api.getSession({ headers: context.req.raw.headers });
	return { session, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
