import { afterEach, describe, expect, it, vi } from "vitest";

const validEnv = {
  BETTER_AUTH_SECRET: "a".repeat(32),
  BETTER_AUTH_URL: "http://localhost:3001",
  WEB_ORIGIN: "http://localhost:5173",
};

describe("parseApiEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses the default API port when PORT is not set", async () => {
    vi.stubEnv("BETTER_AUTH_SECRET", validEnv.BETTER_AUTH_SECRET);
    vi.stubEnv("BETTER_AUTH_URL", validEnv.BETTER_AUTH_URL);
    vi.stubEnv("WEB_ORIGIN", validEnv.WEB_ORIGIN);

    const { parseApiEnv } = await import("./env");

    expect(parseApiEnv(validEnv).port).toBe(3001);
  });

  it("rejects auth URLs with paths", async () => {
    vi.stubEnv("BETTER_AUTH_SECRET", validEnv.BETTER_AUTH_SECRET);
    vi.stubEnv("BETTER_AUTH_URL", validEnv.BETTER_AUTH_URL);
    vi.stubEnv("WEB_ORIGIN", validEnv.WEB_ORIGIN);

    const { parseApiEnv } = await import("./env");

    expect(() =>
      parseApiEnv({
        ...validEnv,
        BETTER_AUTH_URL: "http://localhost:3001/auth",
      }),
    ).toThrow();
  });

  it("rejects short auth secrets", async () => {
    vi.stubEnv("BETTER_AUTH_SECRET", validEnv.BETTER_AUTH_SECRET);
    vi.stubEnv("BETTER_AUTH_URL", validEnv.BETTER_AUTH_URL);
    vi.stubEnv("WEB_ORIGIN", validEnv.WEB_ORIGIN);

    const { parseApiEnv } = await import("./env");

    expect(() =>
      parseApiEnv({
        ...validEnv,
        BETTER_AUTH_SECRET: "too-short",
      }),
    ).toThrow();
  });
});
