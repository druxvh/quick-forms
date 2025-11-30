import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, ...compat.config({
  extends: ["prettier"]
}), {
  ignores: [
    "node_modules",
    "prisma/**",
    "migrations/**",
    ".next/**",
    "dist/**",
    "src/generated/**",
    "src/components/ui",
    "**/*.wasm",
    "**/*.wasm.js",
  ],
}];

export default eslintConfig;
