import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./auth-schema.js";
import { items } from "./schema.js";

config({ path: "../../.env" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const schema = {
  items,
  ...authSchema,
};

export const db = drizzle(pool, { schema });

export async function listItems() {
  return db.select().from(items);
}

export { items };
export * from "./auth-schema.js";
