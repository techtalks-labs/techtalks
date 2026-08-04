import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { z } from "zod";

config({
  path: fileURLToPath(new URL("../../../.env", import.meta.url)),
});

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .trim()
    .min(1)
    .url()
    .refine((value) => {
      const url = new URL(value);
      return url.protocol === "postgres:" || url.protocol === "postgresql:";
    }, "DATABASE_URL must use the postgres or postgresql protocol"),
});

const parsedEnv = envSchema.parse(process.env);

export const dbEnv = {
  databaseUrl: parsedEnv.DATABASE_URL,
} as const;
