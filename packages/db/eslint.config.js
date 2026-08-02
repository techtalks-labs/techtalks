import config from "@repo/eslint-config/node";

export default [
  ...config,
  {
    ignores: ["drizzle/**"],
  },
];
