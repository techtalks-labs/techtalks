import { z } from "zod";

const originSchema = z
  .string()
  .trim()
  .min(1)
  .url()
  .transform((value, context) => {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      context.addIssue({
        code: "custom",
        message: "must use http or https",
      });
      return z.NEVER;
    }

    if (url.pathname !== "/" || url.search || url.hash) {
      context.addIssue({
        code: "custom",
        message: "must be an origin without a path, query, or hash",
      });
      return z.NEVER;
    }

    return url.origin;
  });

const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: originSchema,
  PORT: z.coerce.number().int().min(1).max(65_535).default(3001),
  WEB_ORIGIN: originSchema,
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  betterAuthSecret: parsedEnv.BETTER_AUTH_SECRET,
  betterAuthUrl: parsedEnv.BETTER_AUTH_URL,
  port: parsedEnv.PORT,
  webOrigin: parsedEnv.WEB_ORIGIN,
} as const;
