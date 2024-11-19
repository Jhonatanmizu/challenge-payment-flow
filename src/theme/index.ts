import { createTheme } from "@shopify/restyle";

const palette = {
  white: "#f7f7f7",
  main800: "#004D49",
  main700: "#00726D",
  grey800: "#1f2b2a",
  grey700: "#3b4443",
  grey100: "#f7f7f7",
  main100: "#e5fffe",
  blackAlt: "#252525",
  black: "#000000",
  fadedBlack: "#333333",
  accent: "#FF6F61",
  yellow: "#FFD700",
  red: "#FF4500",
  green: "#32CD32",
  transparent: "transparent",
  greyAlt: "#B0B0B0",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.main100,
    backgroundContrast: palette.grey700,
    white: palette.white,
    black: palette.black,
    fadedBlack: palette.fadedBlack,
    grey: palette.grey700,
    accent: palette.accent,
    yellow: palette.yellow,
    red: palette.red,
    failed: palette.red,
    green: palette.green,
    success: palette.green,
    transparent: palette.transparent,
    greyAlt: palette.greyAlt,
  },
  spacing: {
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 18,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
  },
  textVariants: {
    header: {
      fontFamily: "Montserrat",
      fontSize: 24,
      color: "white",
    },
    headerBlack: {
      fontFamily: "Montserrat",
      fontSize: 24,
      color: "black",
    },
    headerWhite: {
      fontFamily: "Montserrat",
      fontSize: 24,
      color: "white",
    },
    innerField: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    innerFieldBlack: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    innerFieldWhite: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "white",
    },
    placeholder: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "fadedBlack",
    },
    placeholderBlack: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    placeholderWhite: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "white",
    },
    title: {
      fontFamily: "Montserrat",
      fontSize: 16,
      color: "white",
    },
    titleBlack: {
      fontFamily: "Montserrat",
      fontSize: 16,
      color: "black",
    },
    titleWhite: {
      fontFamily: "Montserrat",
      fontSize: 16,
      color: "white",
    },
    subtitle: {
      fontFamily: "Montserrat",
      fontSize: 14,
      color: "white",
    },
    subtitleBlack: {
      fontFamily: "Montserrat",
      fontSize: 14,
      color: "black",
    },
    subtitleWhite: {
      fontFamily: "Montserrat",
      fontSize: 14,
      color: "white",
    },
    description: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "white",
    },
    descriptionBlack: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    descriptionWhite: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "white",
    },
    button: {
      fontFamily: "Montserrat",
      fontSize: 14,
      color: "white",
    },
    buttonBlack: {
      fontFamily: "Montserrat",
      fontSize: 14,
      color: "black",
    },
    buttonWhite: {
      fontFamily: "Montserrat",
      fontSize: 14,
      color: "white",
    },
    title_card: {
      fontFamily: "Montserrat",
      fontSize: 16,
      color: "black",
    },
    title_cardBlack: {
      fontFamily: "Montserrat",
      fontSize: 16,
      color: "black",
    },
    title_cardWhite: {
      fontFamily: "Montserrat",
      fontSize: 16,
      color: "white",
    },
    subtitle_card: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    subtitle_cardBlack: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    subtitle_cardWhite: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "white",
    },
    description_card: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    description_cardBlack: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "black",
    },
    description_cardWhite: {
      fontFamily: "Montserrat",
      fontSize: 12,
      color: "white",
    },
  },
});

export type ThemeType = typeof theme;
export default theme;
