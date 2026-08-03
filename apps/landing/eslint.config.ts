import reactConfig from "@repo/eslint-config/react";
import astro from "eslint-plugin-astro";

export default [
  { ignores: [".astro/**", "dist/**"] },
  ...reactConfig,
  ...astro.configs["flat/recommended"],
];
