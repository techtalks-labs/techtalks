import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { z } from "zod";

const envDir = path.resolve(import.meta.dirname, "../..");

const envSchema = z.object({
  VITE_API_URL: z
    .string()
    .trim()
    .min(1)
    .url()
    .refine((value) => {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    }, "VITE_API_URL must use http or https"),
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, "VITE_");
  envSchema.parse(env);

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      port: 5173,
    },
  };
});
