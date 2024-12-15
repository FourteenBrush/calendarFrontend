import { createContext, PropsWithChildren, useContext, useState } from "react"
import { darkTheme, lightTheme } from "@/styles/theme"
import { useColorScheme } from "react-native"

// TODO: no initial values
const ThemeContext = createContext({
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme,
  toggleTheme: () => {},
})

export const ThemeProvider = ({children}: PropsWithChildren) => {
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

export const useTheme = () => useContext(ThemeContext)
