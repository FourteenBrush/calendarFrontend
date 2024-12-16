import { Platform, TextStyle, ViewStyle } from "react-native"

export const BORDER_RADIUS = Platform.select({ web: 9, default: 1 })
export const APP_CONTAINER_PADDING = Platform.select({ web: 12, default: 0 })
export const MIN_CELL_HEIGHT = Platform.select({ web: 45, default: 22 })

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
