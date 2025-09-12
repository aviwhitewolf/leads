import { z } from "zod";
import { env as cfEnv } from "cloudflare:workers";

// Schema for required runtime configuration. Adjust as needed.
const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  CORS_ORIGIN: z.string().or(z.string().min(1)),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url().optional(),
  DATABASE_URL: z.string().url().optional(),
});

// Cloudflare bindings already validated at deploy time; we coerce + parse.
export type Env = z.infer<typeof envSchema> & {
  HYPERDRIVE: Hyperdrive; // single Hyperdrive binding currently
};

// Parse only string vars; keep binary bindings separately.
function extractStringVars(e: typeof cfEnv): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of Object.keys(e)) {
    const v = (e as any)[k];
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

export const runtimeEnv: Env = Object.assign(
  envSchema.parse(extractStringVars(cfEnv)),
  { HYPERDRIVE: (cfEnv as any).HYPERDRIVE as Hyperdrive },
);
