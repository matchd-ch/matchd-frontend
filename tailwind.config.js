const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"]
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.375rem",
      "3xl": "1.875rem"
    },

    colors: {
      pink: {
        1: "#F21D5E",
        2: "#FC3F78"
      },
      green: {
        1: "#1FAC01",
        2: "#58B624"
      },
      black: colors.black,
      grey: {
        1: "#141414",
        2: "#AFAFAF",
        3: "#EDEDED"
      },
      white: colors.white,
      primaryA: "#000",
      primaryB: "#FFF",
      accent: "#1FAC01",
      negative: "#E11900",
      warning: "#FFC043",
      positive: "#05944F"
    },
    extend: {
      gridTemplateRows: {
        home: "200px"
      },
      gridAutoRows: {
        "1fr": "1fr"
      },
      backgroundImage: {
        "matchd-gradient-t-b":
          "linear-gradient(180deg, #1EAB00 13.96%, rgba(255, 212, 129, 0.87) 50%, #FC3E77 91.04%)",
        "matchd-gradient-l-r":
          "linear-gradient(90deg, #1EAB00 13.96%, rgba(255, 212, 129, 0.87) 50%, #FC3E77 91.04%)"
      },
      padding: {
        full: "100%"
      },
      boxShadow: {
        white: "0 0 0 1px #fff"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
