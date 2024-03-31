import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss"; // Make sure to import 'tailwindcss'

export default defineConfig({
  plugins: [react(), tailwindcss("./tailwind.config.js")],
  server: {
    port: 3000,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:5000',
      //   changeOrigin: true,
      //   // rewrite: (path) => path.replace(/^\/api/, '') // Optional: Strip '/api' from request path
      // }
    },
  },
});
