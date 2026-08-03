const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Missing required environment variable: VITE_API_URL");
}

export const API_URL = apiUrl.replace(/\/+$/, "");
