import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      addExtensions:true
    }),
    preact({
      devToolsEnabled: true,
      reactAliasesEnabled: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
