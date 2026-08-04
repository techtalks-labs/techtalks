import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { listItems } from "@repo/db";
import { auth } from "./auth";
import { env } from "./env";

export const app = express();

app.use(
  cors({
    origin: env.webOrigin,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/items", async (_req, res) => {
  const rows = await listItems();
  res.json(rows);
});
