import { z } from "zod";

// 1. Schema definition
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required"),
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(0, "GOOGLE_GENERATIVE_AI_API_KEY is required"),

  // Workers-only binding → optional for local builds
  HYPERDRIVE: z.any().optional(),
});

// 2. Collect raw env depending on runtime
const rawEnv: Record<string, unknown> =
  (typeof globalThis !== "undefined" && "env" in globalThis
    ? // @ts-expect-error Cloudflare Workers inject env
      globalThis.env
    : process.env) ?? {};

// 3. Parse + validate
export const env = EnvSchema.parse(rawEnv);

// 4. Export inferred TypeScript type
export type Env = z.infer<typeof EnvSchema> & {
  // Only exists in Workers
  HYPERDRIVE?: Hyperdrive;
};
