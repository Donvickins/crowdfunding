import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["a89f-2a00-7c80-0-3ab-00-14.ngrok-free.app"],
  },
});
