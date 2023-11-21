import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';

/** @type {import('tailwindcss').Config}*/
const config = {
 // 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [
    
    
      skeleton({
        themes: {
          // Register each theme within this array:
          preset: [ "gold-nouveau" ] 
        }
      })
  
  ],
};

module.exports = config;
