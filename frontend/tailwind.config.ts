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
	'bright-neutral': '#404040',
	'medium-neutral': '#303030',
	'dark-neutral': '#202020',
        'bright-text': '#000080',
        'medium-text': '#000060',
	'dark-text': '#000040',
	'bright-definition': '#004080',
	'medium-definition': '#003060',
	'dark-definition': '#002040',
	'bright-constraint': '#400080',
	'medium-constraint': '#300060',
	'dark-constraint': '#200040',
	'bright-danger': '#c00000',
	'medium-danger': '#900000',
	'dark-danger': '#600000',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
