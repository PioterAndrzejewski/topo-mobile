import { createTheme } from "@shopify/restyle";

export const palette = {
  white: "#ffffff",
  white75: "#ffffffbf",

  black: "rgba(14, 13, 18, 1)",

  gray: "#49454F",
  gray700: "#F7F2FA",

  blue100: "rgb(242, 241, 244)",
  blue100_25: "rgba(242, 241, 244, 0.25)",
  blue200: "rgba(183, 202, 192, 0.239)",
  blue300: "rgba(147, 169, 158, 0.239)",
  blue500: "hsl(240, 12%, 40%)",
  blue700: "rgb(47, 46, 62)",
  blue700_10: "rgba(47, 46, 62, 0.1)",

  yellow: "#cdbb48",
  yellow50: "rgba(205, 187, 72, 0.2)",
  green: "#496520",
  green20: "rgba(37, 172, 87, 0.2)",
  greenSecondary: "#C6E49A",

  red: "rgb(210, 47, 39)",
};

export const theme = createTheme({
  colors: {
    backgroundScreen: palette.white,
    backgroundSecondary: palette.green,
    backgroundSecondaryFaded: palette.blue100_25,
    backgroundFaded: palette.white75,
    backgroundDark: palette.blue700,
    backgroundTertiary: palette.greenSecondary,
    backgroundTertiaryFaded: palette.yellow50,
    backgroundGreenFaded: palette.green20,
    backgroundLight: palette.gray700,
    backgroundError: palette.red,

    secondary: palette.green,
    finished: palette.green,
    project: palette.yellow,
    other: palette.blue500,

    imageOverlay: palette.blue700_10,

    favoriteRed: palette.red,
    error: palette.red,

    // text
    textBlack: palette.blue700,
    textSecondary: palette.green,
    textGray: palette.gray,
    textLight: palette.blue300,
    textWhite: palette.blue100,
  },
  spacing: {
    "3xs": 2,
    "2xs": 4,
    xs: 6,
    s: 8,
    m: 16,
    "-m": -16,
    l: 24,
    "-l": -32,
    xl: 40,
    "2xl": 48,
    "3xl": 60,
    "4xl": 80,
    "5xl": 110,
    "6xl": 140,
  },
  textVariants: {
    h1: {
      fontFamily: "Outfit700",
      fontSize: 32,
    },

    h2: {
      fontFamily: "Outfit500",
      fontSize: 24,
    },
    h3: {
      fontFamily: "Outfit500",
      fontSize: 16,
    },
    h4: {
      fontFamily: "Outfit500",
      fontSize: 14,
    },
    button: {
      fontFamily: "Outfit400",
      fontSize: 16,
      letterSpacing: 1,
    },
    label: {
      fontFamily: "Outfit400",
      fontSize: 15,
    },
    title: {
      fontFamily: "Outfit400",
      fontSize: 15,
      lineHeight: 20,
    },
    caption: {
      fontFamily: "Outfit400",
      fontSize: 11,
      lineHeight: 20,
    },
    body: {
      fontFamily: "Outfit400",
      fontSize: 14,
    },
    special: {
      fontFamily: "Outfit300",
      fontSize: 12,
      lineHeight: 14,
    },
    input: {
      fontFamily: "Outfit300",
      fontSize: 15,
      letterSpacing: 2,
    },
    marker: {
      fontFamily: "Outfit400",
      fontSize: 14,
    },
  },
});

export const styleGuide = {
  bottomSheet: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: "#fff",
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 999,
    zIndex: 999,
    border: 1,
    borderColor: "#000000",
    borderRadius: 12,
  },
  cardShadow: {
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: "backgroundScreen" as keyof (typeof theme)["colors"],
    shadowRadius: 6,
    shadowOpacity: 0.15,
    elevation: 5,
    zIndex: 99,
    shadowColor: "backgroundDark" as keyof (typeof theme)["colors"],
    borderRadius: 12,
  },
};

export type Theme = typeof theme;
export default theme;
