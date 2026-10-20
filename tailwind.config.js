const colors = require("tailwindcss/colors");
const zincPalette = colors.zinc || colors.gray;
const olivePalette = {
  50: "#f6f7ee",
  100: "#ecefd7",
  200: "#d9dfad",
  300: "#c2cb7f",
  400: "#adb85a",
  500: "#8e9a3a",
  600: "#707b2f",
  700: "#555e26",
  800: "#3f461d",
  900: "#2c3115",
};

module.exports = {
  mode: "jit",
  // If you’re on Tailwind v3+, rename `purge` -> `content`
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ['"Satoshi"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      serif: ["ui-serif", "Georgia"],
    },
    extend: {
      boxShadow: {
        xl: "0 5px 20px -1px rgba(0, 0, 0, 0.3)",
        card: "0 1px 0 0 var(--line), 0 12px 32px -16px rgba(15, 23, 18, 0.18)",
      },
      maxWidth: {
        "6xl": "1240px",
      },
      colors: {
        // Design tokens — values live in styles/globals.css (light + dark)
        page: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        brand: "var(--brand)",
        "brand-ink": "var(--brand-ink)",
        lightbg: "#f9f3ef",
      },
      letterSpacing: {
        label: "0.14em",
      },
    },
    transitionDuration: {
      DEFAULT: "150ms",
      0: "0ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      2000: "2000ms",
      4000: "4000ms",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      zinc: zincPalette,
      olive: olivePalette,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      amber: colors.amber,
      emerald: colors.emerald,
      blue: colors.sky,
      red: colors.red,
      // Legacy names still used on inner pages
      synth: { DEFAULT: "#133e34" },
      synthPink: { DEFAULT: "#133e34" },
      gradBlue: "#133e34",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    display: ["responsive", "group-hover", "group-focus"],
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
