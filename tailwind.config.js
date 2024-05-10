/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#0E0E11",
        dark2: "#18181B",
        primary: "#29bdf3",
        secondary: "#f0faff",
        'blue': {
          '50': '#f0faff',
          '100': '#e1f3fd',
          '200': '#bbe9fc',
          '300': '#80d7f9',
          '400': '#29bdf3',
          '500': '#12abe5',
          '600': '#068bc3',
          '700': '#066e9e',
          '800': '#0a5d82',
          '900': '#0e4d6c',
          '950': '#093248',
        },
      },
      backgroundImage: theme => ({
        'gradient-to-45': 
            'linear-gradient(45deg, #ffed4a, #ff3860)',
      })
    },
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: [
  //     // light theme
  //     {
  //       light: {
  //         ...require("daisyui/src/theming/themes")["[data-theme=light]"],
  //         "--primary": "#e20613",
  //       },
  //     },
  //   ],
  // },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#29bdf3",
          secondary: "#f0faff",
        },
      },
    ],
  },
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
    "Error.{js,ts,vue}",
    "error.{js,ts,vue}",
    "content/**/*.md",
  ],
};
