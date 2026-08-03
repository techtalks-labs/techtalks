import { defineConfig } from "drizzle-kit";
import { dbEnv } from "./src/env";

export default defineConfig({
  schema: ["./src/schema.ts", "./src/auth-schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbEnv.databaseUrl,
  },
});
