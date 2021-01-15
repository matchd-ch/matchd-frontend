module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    fontSize: {
      xs: "0.833333333rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.375rem",
      "3xl": "1.875rem",
      "4xl": "2.625rem",
      "5xl": "6.375rem",
      "heading-35": ["2.1875rem", "102%"],
      "heading-45": ["2.8125rem", "106%"],
      "heading-58": ["5.625rem", "104%"],
      "heading-68": ["4.25rem", "97%"],
      "heading-90": ["5.625rem", "100%"],
    },

    colors: {
      pink: {
        1: "#F21D5E",
        2: "#FC3F78",
      },
      green: {
        1: "#1FAC01",
        2: "#58B624",
      },
      black: "#000",
      grey: {
        1: "#141414",
        2: "#AFAFAF",
        3: "#EDEDED",
      },
      white: "#FFF",
      primaryA: "#000",
      primaryB: "#FFF",
      accent: "#1FAC01",
      negative: "#E11900",
      warning: "#FFC043",
      positive: "#05944F",
    },
    extend: {
      minHeight: {
        "145px": "145px",
      },
      gridTemplateRows: {
        home: "200px",
      },
      gridAutoRows: {
        "1fr": "1fr",
      },
      backgroundImage: {
        "matchd-gradient-t-b":
          "linear-gradient(180deg, #1EAB00 13.96%, rgba(255, 212, 129, 0.87) 50%, #FC3E77 91.04%)",
        "matchd-gradient-l-r":
          "linear-gradient(90deg, #1EAB00 29.69%, #66B72D 38.54%, rgba(255, 212, 129, 0.87) 50%, #FB6A7C 61.46%, #FC3E77 71.87%)",
      },
      padding: {
        full: "100%",
      },
      boxShadow: {
        white: "0 0 0 1px #fff",
      },
      borderRadius: {
        30: "30px",
      },
      placeholderColor: {
        primary: "#000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
