import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "posts/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
];

export default config;
