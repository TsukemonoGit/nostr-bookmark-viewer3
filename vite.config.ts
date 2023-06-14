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
        theme_color: "#d9fa6b",
        icons: [
          {
            src: "icon.png",
            type: "image/png",
            purpose: "any maskable",
            sizes: "48x48, 144x144",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
