import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';
import { customTheme } from './customTheme';
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
		

				custom: [customTheme]
			}
		})
  ],
};

module.exports = config;
