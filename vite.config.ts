import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  nitro: {
    preset: "vercel"
  },
  tanstackStart: {
    entry: "server",
  },
  vite: {
    server: {
      // Allows ngrok to bypass Vite's host security checks
      allowedHosts: true,
      // Exposes the server on your local network
      host: true,
    },
  },
});
