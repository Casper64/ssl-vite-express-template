import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { globSync } from "glob";

export default defineConfig((config) => {
  const env: Record<string, string> = loadEnv(
    config.mode,
    process.cwd(),
    "VITE"
  );

  const viteConfiguration: any = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        [key.substring("VITE_".length)]: val,
      };
    },
    {}
  );

  let htmlFiles: string[];

  if (config.mode === "development") {
    htmlFiles = globSync("**/*.html", {
      cwd: resolve(__dirname, "./public"),
    });
  } else {
    htmlFiles = globSync("public/**/*.html", {
      cwd: resolve(__dirname, "./"),
    });
  }

  const input: any = {};
  htmlFiles.forEach((e: string, i: number) => {
    input[`app_${i}`] = resolve(e);
  });

  return {
    base: "./",
    root: "public",
    resolve: {
      alias: {
        "/src": resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: input,
      },
      outDir: resolve(__dirname, "../dist/web"),
      emptyOutDir: true,
    },
    esbuild: {
      supported: {
        "top-level-await": true,
      },
    },
    define: {
      viteConfiguration: viteConfiguration,
    },
    server: {
      strictPort: true,
      port: 3000,
      https: {
        cert: "../certs/localhost.pem",
        key: "../certs/localhost-key.pem",
      },
    },
    preview: {
      strictPort: true,
      port: 3000,
    },
  };
});
