type OriginName = "BETTER_AUTH_URL" | "WEB_ORIGIN";

function parseOrigin(name: OriginName): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be a valid absolute URL`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`${name} must use http or https`);
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(`${name} must be an origin without a path, query, or hash`);
  }

  return url.origin;
}

function parseAuthSecret(): string {
  const value = process.env.BETTER_AUTH_SECRET;

  if (!value) {
    throw new Error("Missing required environment variable: BETTER_AUTH_SECRET");
  }

  if (value.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters");
  }

  return value;
}

function parsePort(): number {
  const port = Number(process.env.PORT ?? "3001");

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return port;
}

export const env = {
  betterAuthSecret: parseAuthSecret(),
  betterAuthUrl: parseOrigin("BETTER_AUTH_URL"),
  port: parsePort(),
  webOrigin: parseOrigin("WEB_ORIGIN"),
} as const;
