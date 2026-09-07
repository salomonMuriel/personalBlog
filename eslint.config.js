import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      ".husky/**",
      ".vscode/**",
      "node_modules/**",
      "public/**",
      "dist/**",
      ".vercel/**",
      ".yarn/**",
      // Las 36 exploraciones de diseño no son código del sitio.
      "design-directions/**",
    ],
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
