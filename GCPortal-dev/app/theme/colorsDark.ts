const palette = {
  neutral900: "#FFFFFF",
  neutral800: "#F4F2F1",
  neutral700: "#D7CEC9",
  neutral600: "#B6ACA6",
  neutral500: "#978F8A",
  neutral400: "#564E4A",
  neutral300: "#3C3836",
  neutral200: "#191015",
  neutral100: "#000000",

  primary600: "#F4E0D9",
  primary500: "#E8C1B4",
  primary400: "#DDA28E",
  primary300: "#D28468",
  primary200: "#C76542",
  primary100: "#A54F31",

  secondary500: "#DCDDE9",
  secondary400: "#BCC0D6",
  secondary300: "#9196B9",
  secondary200: "#626894",
  secondary100: "#41476E",

  accent500: "#FFEED4",
  accent400: "#FFE1B2",
  accent300: "#FDD495",
  accent200: "#FBC878",
  accent100: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  purpleAccent: "#63309A",
  darkPurple: '#170134',
  yellowAccent: '#F8BE00',
  plainWhite: '#FFFFFF',
  darkWhite: '#EAEEF1', // lol
  plainBlack: '#000000',
  darkGrey: '#8D8D8D'
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.plainWhite,
  textDim: palette.darkGrey,
  background: palette.darkPurple,
  border: palette.darkWhite,
  tint: palette.purpleAccent,
  tintInactive: palette.darkGrey,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
  secondaryAccent: palette.yellowAccent,
} as const
