import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import Vuetify from "@vuetify/vite-plugin";

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.js",
      refresh: true,
      postcss: {
        plugins: [autoprefixer()],
      },
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    Vuetify({ autoImport: true }),

    // vuetify({ autoImport: true }),
  ],
});
