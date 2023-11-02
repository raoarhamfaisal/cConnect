module.exports = {
  plugins: {
    // "postcss-nested": {},
    // "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions",
        "Firefox ESR",
        "not dead",
        "iOS >= 8",
        "Safari >= 8",
        "IE >= 10",
      ],
    },
  },
};
