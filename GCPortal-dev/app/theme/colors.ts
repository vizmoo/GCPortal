// define our colors here
// these are the colors we will use across the app..
const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

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
  darkGrey: '#8D8D8D',

  // temporary 
  profilePurple: "#9D85FF",
  profileGreen: "#05C756",
  profileBlue: "#1B9AAA",
  profileRed: "#EF476F",
  profileYellow: "#FFC43D"
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.plainBlack,
  /**
   * Secondary text information.
   */
  textDim: palette.darkGrey,
  /**
   * The default color of the screen background.
   */
  background: palette.plainWhite,
  /**
   * The default border color.
   */
  border: palette.darkWhite,
  /**
   * The main tinting color.
   */
  tint: palette.purpleAccent,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.darkWhite,
  /**
   * A subtle color used for lines.
   */
  separator: palette.darkWhite,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  secondaryAccent: palette.yellowAccent,
  /**
     * Unclickable object/text
     */
  unclickable: palette.neutral300,
  /**
   * Profile colors also temporary
   */
  profileColors: [
    palette.profileBlue, 
    palette.profileGreen, 
    palette.profilePurple,
    palette.profileRed,
    palette.profileYellow]
} as const
