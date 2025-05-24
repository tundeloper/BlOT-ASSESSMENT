import type { Config } from "tailwindcss";


export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#9a1b39",
        foreground: "#9a1b39",
        // primary: "var(--primary)",
        // secondary: "var(--secondary)",
        secondary: '#9a1b39', // red color 
        primary50: '#9a1b395e',
        primary: '#463a85', // blue color
        secondary20: '#463a85a6',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
