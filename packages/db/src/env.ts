import { fileURLToPath } from "node:url";
import { config } from "dotenv";

config({
  path: fileURLToPath(new URL("../../../.env", import.meta.url)),
});

function parseDatabaseUrl(): string {
  const value = process.env.DATABASE_URL?.trim();

  if (!value) {
    throw new Error("Missing required environment variable: DATABASE_URL");
  }

  const url = new URL(value);

  if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
    throw new Error("DATABASE_URL must use the postgres or postgresql protocol");
  }

  return value;
}

export const dbEnv = {
  databaseUrl: parseDatabaseUrl(),
} as const;
