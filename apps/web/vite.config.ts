import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const envDir = path.resolve(import.meta.dirname, "../..");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, "VITE_");

  if (!env.VITE_API_URL) {
    throw new Error("Missing required environment variable: VITE_API_URL");
  }

  const apiUrl = new URL(env.VITE_API_URL);

  if (apiUrl.protocol !== "http:" && apiUrl.protocol !== "https:") {
    throw new Error("VITE_API_URL must use http or https");
  }

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
