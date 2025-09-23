import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode, command }) => {
  // 根据环境变量决定是否启用代理
  const enableProxy = process.env.VITE_USE_PROXY === 'true';
  
  return {
    base: "./",
    plugins: [vue()],
    server: {
      // 只有当 VITE_USE_PROXY=true 时才启用代理
      proxy: enableProxy ? {
        "/api": {
          target: "http://localhost:81", // 浩东
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } : undefined
    },
    resolve: {
      preserveSymlinks: false,
      dedupe: ["vue","vue-router","pinia","element-plus"],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: { __PRODUCT_STANDALONE__: true }
  };
});
