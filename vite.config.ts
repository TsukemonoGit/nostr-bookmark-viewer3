import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: 'generateSW',
      useCredentials: true,
      manifest: {
        name: `nostr-bookmark-viewer3`,
        short_name: 'nbv3.4',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa_icon.png',
            type: 'image/png',
            purpose: 'maskable',
            sizes: '48x48, 144x144',
          },
          {
            src: 'pwa_icon-512.png',
            type: 'image/png',
            purpose: 'maskable',
            sizes: '512x512',
          },
          {
            src: 'pwa_icon-192.png',
            type: 'image/png',
            purpose: 'maskable',
            sizes: '192x192',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
