import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./auth-schema";
import { dbEnv } from "./env";
import { items } from "./schema";

const pool = new Pool({
  connectionString: dbEnv.databaseUrl,
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
export * from "./auth-schema";
