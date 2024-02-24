const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.vue",
  ],

  theme: {
    screens: {
      sx: "380px",
      xs: "460px",
      "max-sm": { max: "640px" },
      "max-md": { max: "768px" },
      "max-lg": { max: "1024px" },
      "max-xl": { max: "1280px" },
      ...defaultTheme.screens,
    },

    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },

      colors: {
        "black-rgba": "rgba(0, 0,   0,  0.54)",
        "blue-rgba": "rgba(36, 30, 109,  1.00)", //#241e6d
        "blue-30-rgba": "rgba(36, 30, 109,  0.33)", // #0d0c22
        "green-rgba": "#00cc00", // #087f5b
        "slate-30-rgba": "rgba(226, 232, 240,  0.40)",
        "gray-30-rgba": "rgba(209, 213, 219,  0.50)",
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
//gradients
//background-image: radial-gradient( circle 815px at 23.4% -21.8%, rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% );
//background-image: linear-gradient( 111.4deg, rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% );
