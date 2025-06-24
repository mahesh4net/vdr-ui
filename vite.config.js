import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://virtual-deal-room-backend-5k9z.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
