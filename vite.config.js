import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // [UBAH] build target modern + aset kecil (<4KB) di-inline -> lebih sedikit request di HP
  build: { target: "es2020", assetsInlineLimit: 4096, chunkSizeWarningLimit: 300 },
  server: {
    host: true,          // dengarkan semua jaringan -> bisa dibuka dari HP lewat IP WiFi
    port: 5173,
    // [BARU] Vite memblokir domain asing (error "Blocked request. This host is not allowed").
    // Domain ngrok berubah-ubah, jadi dibolehkan semua selama development.
    allowedHosts: true,
  },
  preview: { host: true, port: 4173, allowedHosts: true },
});
