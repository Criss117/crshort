// @ts-check
import path from "node:path";
import url from "node:url";
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

const _dirname = path.dirname(url.fileURLToPath(import.meta.url));

console.log(path.resolve(_dirname, "src"));

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(_dirname, "src"),
      },
    },
  },
  env: {
    schema: {
      TURSO_DATABASE_URL: envField.string({
        context: "server",
        default: "http://127.0.0.1:8080",
        access: "public",
      }),
      TURSO_AUTH_TOKEN: envField.string({
        context: "server",
        default: "your_auth_token",
        access: "public",
      }),
      BETTER_AUTH_SECRET: envField.string({
        context: "server",
        access: "public",
      }),
      BETTER_AUTH_URL: envField.string({
        context: "server",
        access: "public",
      }),
      GITHUB_CLIENT_ID: envField.string({
        context: "server",
        access: "public",
      }),
      GITHUB_CLIENT_SECRET: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },
  integrations: [react()],
  adapter: netlify(),
  prefetch: true,
  output: "server",
});
