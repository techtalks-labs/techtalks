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

export const parseDbEnv = (input: NodeJS.ProcessEnv) => {
  const parsedEnv = envSchema.parse(input);

  return {
    databaseUrl: parsedEnv.DATABASE_URL,
  } as const;
};

export const dbEnv = parseDbEnv(process.env);
