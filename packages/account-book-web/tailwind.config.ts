import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          0: "#ECECEC",
          1: "#C6C6C6",
          2: "#A0A0A0",
          3: "#4B4B4B",
          4: "#2E2E2E",
          5: "#121212",
        },
        primary: "#C9DB03",
        secondary: "#FEF300",
        point: "#81A003",
        sub: "#FBF1B2",
        caution: "#EF5D5D",
        background: "#f6f6f4",
        white: "#ffffff",
        modalBackground: "rgba(0, 0, 0, 0.4)",
        expenseBg: "#FFF0F0",
        expenseText: "#F87675",
        incomeBg: "#EEFCF0",
        incomeText: "#2EAC57",
      },
      height: {
        "90vh": "90vh",
      },
    },
  },
  plugins: [],
};
export default config;
