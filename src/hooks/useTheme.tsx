import { createContext, PropsWithChildren, useContext, useState } from "react"
import { darkTheme, lightTheme, Theme } from "@/styles/theme"
import { useColorScheme } from "react-native"

export type ThemeContextValues = {
  theme: Theme,
  toggleTheme: () => void,
}

const ThemeContext = createContext({} as ThemeContextValues)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme() ?? "dark"
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark")

  const toggleTheme = () => setIsDarkMode(prev => !prev)

  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const theme = useContext(ThemeContext)
  if (theme == null) {
    throw new Error("no theme provider found, did you forget to wrap your component with one?")
  }
  return theme
}
