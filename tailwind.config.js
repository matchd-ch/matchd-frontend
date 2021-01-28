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
      "paragraph-sm": ["0.875rem", "131%"],
      "paragraph-md": ["1rem", "147%"],
      "paragraph-lg": ["1.125rem", "131%"],
      "heading-xs": ["1.25rem", "118%"],
      "heading-sm": ["1.5rem", "123%"],
      "heading-md": ["1.75rem", "108%"],
      "heading-lg": ["2rem", "114%"],
      "display-xs": ["2.1875rem", "102%"],
      "display-sm": ["2.8125rem", "106%"],
      "display-md": ["5.625rem", "104%"],
      "display-lg": ["4.25rem", "97%"],
      "display-xl": ["5.625rem", "100%"],
      "cta-xl": ["3.875rem", "108%"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
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
        4: "#FAFAFA",
      },
      white: "#FFF",
      primaryA: "#000",
      primaryB: "#FFF",
      accent: "#1FAC01",
      negative: "#E11900",
      "negative-light": "#FFE9E9",
      warning: "#FFC043",
      positive: "#05944F",
    },
    extend: {
      minHeight: {
        "145px": "145px",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        home: "200px",
        register: "1fr auto 1fr",
      },
      gridAutoRows: {
        "1fr": "1fr",
      },
      backgroundImage: {
        "matchd-gradient-t-b":
          "linear-gradient(180deg, #1EAB00 29.69%, #66B72D 38.54%, rgba(255, 212, 129, 0.87) 50%, #FB6A7C 61.46%, #FC3E77 71.87%)",
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
