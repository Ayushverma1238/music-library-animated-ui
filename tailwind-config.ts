import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/**
 * Add all Tailwind colors as CSS variables.
 *
 * Example:
 * bg-slate-900
 *
 * becomes:
 *
 * var(--slate-900)
 */
function addVariablesForColors({
  addBase,
  theme,
}: {
  addBase: (base: any) => void;
  theme: any;
}) {
  const allColors = flattenColorPalette(theme("colors"));

  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [
      `--${key}`,
      value,
    ])
  );

  addBase({
    ":root": newVars,
  });
}

/**
 * Add custom SVG background utilities.
 *
 * bg-grid
 * bg-grid-small
 * bg-dot
 */
function addSvgPatterns({
  matchUtilities,
  theme,
}: {
  matchUtilities: any;
  theme: any;
}) {
  matchUtilities(
    {
      "bg-grid": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            stroke="${value}">
            <path d="M0 .5H31.5V32"/>
          </svg>`
        )}")`,
      }),

      "bg-grid-small": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="8"
            height="8"
            fill="none"
            stroke="${value}">
            <path d="M0 .5H31.5V32"/>
          </svg>`
        )}")`,
      }),

      "bg-dot": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="16"
            height="16"
            fill="none">
            <circle
              fill="${value}"
              cx="10"
              cy="10"
              r="1.6257413380501518"
            />
          </svg>`
        )}")`,
      }),
    },
    {
      values: flattenColorPalette(
        theme("backgroundColor")
      ),
      type: "color",
    }
  );
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      /**
       * Custom animations
       */
      animation: {
        spotlight:
          "spotlight 2s ease 0.75s 1 forwards",

        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },

      /**
       * Custom background images
       */
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-stops))",

        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops)",
      },

      /**
       * Keyframes
       */
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform:
              "translate(-72%, -62%) scale(0.5)",
          },

          "100%": {
            opacity: "1",
            transform:
              "translate(-50%, -40%) scale(1)",
          },
        },

        scroll: {
          to: {
            transform:
              "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },

  plugins: [
    addVariablesForColors,
    addSvgPatterns,
  ],
};

export default config;