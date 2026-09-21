import { afterEach, describe, expect, it, vi } from "vitest";

describe("parseDbEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("accepts postgres connection strings", async () => {
    vi.stubEnv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/techtalks");

    const { parseDbEnv } = await import("./env");

    expect(
      parseDbEnv({
        DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/techtalks",
      }),
    ).toEqual({
      databaseUrl: "postgresql://postgres:postgres@localhost:5432/techtalks",
    });
  });

  it("rejects non-postgres URLs", async () => {
    vi.stubEnv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/techtalks");

    const { parseDbEnv } = await import("./env");

    expect(() =>
      parseDbEnv({
        DATABASE_URL: "https://example.com/database",
      }),
    ).toThrow();
  });
});
