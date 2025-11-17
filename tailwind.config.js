/** * @fileoverview Tailwind CSS Configuration file. 
 * This file defines the framework's behavior, including where 
 * it should scan for classes (the 'content' array), custom theme 
 * settings (under 'theme.extend'), and any custom plugins to be used.
 * It's essential for mapping utility classes to your component files.
 */


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
