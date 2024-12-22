import { Platform, TextStyle, ViewStyle } from "react-native"

export const BORDER_RADIUS = Platform.select({ web: 9, default: 1 })
export const APP_CONTAINER_PADDING = Platform.select({ web: 12, default: 0 })
export const MIN_CELL_HEIGHT = Platform.select({ web: 45, default: 22 })

// NOTE: properties are defined as ViewStyle (or something similar) for the ease of writing
// `style={[theme.something, theme.somethingElse]}`
export type Theme = {
  root: ViewStyle,
  loginScreenRoot: ViewStyle,
  textPrimary: TextStyle,
  titleBig: TextStyle,
  formField: TextStyle,
}

const DARKMODE_TEXT_COLOR = "#dbdbdb"

const sharedTheme: Partial<Theme> = {
  textPrimary: { color: DARKMODE_TEXT_COLOR },
  titleBig: { fontSize: 40, color: DARKMODE_TEXT_COLOR },
}

export const darkTheme: Theme = {
  ...sharedTheme as Theme,
  root: { backgroundColor: "#1b1b1d" },
  loginScreenRoot: { backgroundColor: "#232326" },
  formField: {
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 5,
    color: DARKMODE_TEXT_COLOR,
  },
}

export const lightTheme: Theme = {
  ...sharedTheme as Theme,
  root: { backgroundColor: "#fff" },
}
