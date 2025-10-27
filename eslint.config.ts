import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import globals from "globals";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Regras personalizadas para todo o projeto
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // TypeScript
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // Qualidade de código
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-duplicate-imports": "error",
    },
  },

  // Configuração específica para testes Jest
  {
    files: ["src/**/__tests__/**/*", "src/**/*.test.*", "src/**/*.spec.*"],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,

      // Regras Jest personalizadas
      "jest/expect-expect": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",

      // Relaxar algumas regras em testes
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },

  // Configuração específica para testes E2E (Playwright)
  {
    files: ["e2e/**/*.ts", "e2e/**/*.spec.ts"],
    languageOptions: {
      parserOptions: {
        project: "./e2e/tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Relaxar regras para testes E2E
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off",
    },
  },

  // Arquivos a ignorar
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "*.config.js",
      "*.config.ts",
      "vite.config.ts",
      "jest.config.js",
      "playwright.config.ts",
    ],
  },
);
