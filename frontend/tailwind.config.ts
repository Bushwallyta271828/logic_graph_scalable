import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bright-text': '#000080',
        'medium-text': '#000060',
	'dark-text': '#000040',
	'bright-definition': '#004080',
	'medium-definition': '#003060',
	'dark-definition': '#002040',
	'bright-zeroth-order': '#400080',
	'medium-zeroth-order': '#300060',
	'dark-zeroth-order': '#200040',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
