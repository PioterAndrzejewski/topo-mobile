import { createTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  blue: '#336383',

  red: 'rgba(200, 28, 28, 1)',
  red25: 'rgba(173, 16, 16, 0.75)',

  black: '#0B0B0B',
  black24: 'rgba(0, 0, 0, 0)',
  white: '#fcfcfc',
  white80:'rgba(255, 255, 255, 0.8)',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainBackgroundFaded: palette.white80,
    backgroundBlack: palette.black,

    secondary: palette.blue,

    cardPrimaryBackground: palette.purplePrimary,
    imageOverlay: palette.black24,

    favoriteRed: palette.red,
  },
  spacing: {
    '2xs': 4,
    'xs': 6,
    's': 8,
    'm': 16,
    'l': 24,
    'xl': 40,
    '2xl': 48,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export type Theme = typeof theme;
export default theme;