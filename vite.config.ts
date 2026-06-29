import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  nitro: {
    preset: "vercel",
    vercel: {
      functions: {
        runtime: "nodejs22.x"
      }
    },
    externals: {
      inline: ["@supabase/supabase-js", "@supabase/functions-js", "tslib"]
    }
  },
  tanstackStart: {
    // Fixed: Removed the inner curly braces
    entry: "server",
  },
  vite: {
    resolve: {
      alias: {
        'tslib': path.resolve(__dirname, 'node_modules/tslib/tslib.es6.js')
      }
    },
    server: {
      // Allows ngrok to bypass Vite's host security checks
      allowedHosts: true,
      // Exposes the server on your local network
      host: true,
    },
  },
});
