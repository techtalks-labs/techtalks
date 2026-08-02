import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { listItems } from "@repo/db";
import { auth } from "./auth";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
