module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.vue"],
  },
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
      "display-md": ["3.625rem", "104%"],
      "display-lg": ["4.25rem", "97%"],
      "display-xl": ["5.625rem", "100%"],
      "display-xs-fluid": ["responsive 1.8rem 2.1875rem", "102%"],
      "display-sm-fluid": ["responsive 2rem 2.8125rem", "106%"],
      "display-md-fluid": ["responsive 2.2rem 3.625rem", "97%"],
      "display-lg-fluid": ["responsive 2.5rem 4.25rem", "97%"],
      "display-xl-fluid": ["responsive 3rem 5.625rem", "100%"],
      "icon-lg": "2.25rem",
      "link-md": ["1.3125rem", "127%"],
      "cta-xl": ["3.875rem", "108%"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      pink: {
        1: "#F21D5E",
        2: "#FC3F78",
        3: "#FB617B",
        5: "#FFE9E9",
      },
      green: {
        1: "#1FAC01",
        2: "#58B624",
        3: "#95CC3C",
        5: "#E0F3DE",
      },
      orange: {
        1: "#FF8717",
        2: "#FF8963",
        3: "#EDC141",
      },
      black: "#000",
      grey: {
        1: "#141414",
        2: "#AFAFAF",
        3: "#EDEDED",
        4: "#FAFAFA",
      },
      primary: {
        1: "var(--color-primary-1)",
        2: "var(--color-primary-2)",
        3: "var(--color-primary-3)",
        4: "var(--color-primary-5)",
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
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
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
        "company-gradient-t-b":
          "linear-gradient(180deg, #FC3E77 9.02%, rgba(255, 212, 129, 0.87) 135.27%, #1EAB00 270.54%);",
      },
      padding: {
        full: "100%",
        "1/2": "50%",
        "1/4": "25%",
      },
      boxShadow: {
        white: "0 0 0 1px #fff",
        pink: "0 0 0 1px #F21D5E",
        green: "0 0 0 1px #1FAC01",
        orange: "0 0 0 1px #FF8717",
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
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
