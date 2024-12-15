import { TextStyle, ViewStyle } from "react-native"

// NOTE: properties are defined as ViewStyle (or something similar) for the ease of writing
// `style={[theme.something, theme.somethingElse]}`
export type Theme = {
  root: ViewStyle,
  textPrimary: TextStyle,
}

const sharedTheme: Partial<Theme> = {
  textPrimary: { color: "#dbdbdb" },
}

export const darkTheme: Theme = {
  ...sharedTheme as Theme,
  root: { backgroundColor: "#1b1b1d" },
}

export const lightTheme: Theme = {
  ...sharedTheme as Theme,
  root: { backgroundColor: "#fff" },
}
