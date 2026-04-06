import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: [".husky/**", ".vscode/**", "node_modules/**", "public/**", "dist/**", ".yarn/**"],
  },
  {
    languageOptions: {
      globals: {
        node: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  ...eslintPluginAstro.configs["flat/recommended"],
];
