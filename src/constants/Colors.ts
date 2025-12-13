export const Colors = {
  primary: "#00aaccff",
  warning: "#cc475a",

  dark: {
    text: "#cdcdcdff",
    background: "#3b3b3bff",
  },
  light: {
    text: "#3b3b3bff",
    background: "#cdcdcdff",

  }
} as const;


export type ThemeName = keyof typeof Colors; 