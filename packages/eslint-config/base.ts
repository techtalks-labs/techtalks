import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";

export const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  unicorn.configs["flat/recommended"],
  perfectionist.configs["recommended-alphabetical"],
  {
    ignores: ["dist/**", "node_modules/**", ".turbo/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-thenable": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/no-array-sort": "off",
      "unicorn/import-style": "off",
      "unicorn/no-process-exit": "off",
      "unicorn/prefer-query-selector": "off",
      "unicorn/no-nested-ternary": "off",
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      "unicorn/filename-case": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
