import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: "generateSW",
      useCredentials: true,
      manifest: {
        name: `nostr-bookmark-viewer3`,
        short_name: "nbv3",

        icons: [
          {
            src: "icon.png",
            type: "image/png",
            purpose: "any",
            sizes: "512",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
