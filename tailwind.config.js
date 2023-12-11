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
      x350: "350px",

      x365: "365px",
      sx: "380px",
      xs: "460px",
      "max-sm": { max: "639px" },//640
      "max-md": { max: "767px" },//768
      "max-lg": { max: "1023px" },//1024
      "max-xl": { max: "1279px" },//1280
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
        "teal-green": "#16a34a",
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
//  background-image: linear-gradient(111.4deg, rgba(27, 24, 113, 1) 6.5%, rgba(7, 7, 9, 1) 97.2%);

//url = usePage().url.value;
// #e5e7eb
// #edecea

// template 1 color 4 and color 5

// #241e6d
// #1864ab

//template 2 color
// color 4 =>#364fc7
// #e2e8f0
// #16a34a
// pricing
// 073e53 b5c5cb
