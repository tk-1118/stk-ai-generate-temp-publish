import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import qiankun from "vite-plugin-qiankun";

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");

  // 根据环境变量决定是否启用代理
  const enableProxy = env.VITE_USE_PROXY === "true";

  console.log(enableProxy, env.VITE_USE_PROXY);

  return {
    base: process.env.NODE_ENV === "production" ? "/sub-app/product-foo-prd/" : "./",
    plugins: [
      vue(),
      qiankun("product-foo-prd", {
        useDevMode: true,
      }),
    ],
    css: {
      postcss: './postcss.config.cjs',
    },
    build: {
      cssCodeSplit: false,
    },
    server: {
      port: 4446,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // 只有当 VITE_USE_PROXY=true 时才启用代理
      proxy: enableProxy
        ? {
            "/api": {
              target: "http://localhost:81", // 浩东
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          }
        : undefined,
    },
    resolve: {
      preserveSymlinks: false,
      dedupe: ["vue", "vue-router", "pinia", "element-plus"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: { __PRODUCT_STANDALONE__: true },
  };
});
