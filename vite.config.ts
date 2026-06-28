import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
  },
  tanstackStart: {
    // Fixed: Removed the inner curly braces
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
