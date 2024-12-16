import { StatusBar } from "expo-status-bar"
import { ThemeProvider, useTheme } from "@/hooks/useTheme"
import { StyleSheet, View } from "react-native"
import Calendar from "@/components/Calendar"

export default () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
)

const AppContent = () => {
  const { theme } = useTheme()

  return (
    <View style={[theme.root, styles.app]}>
      <Calendar />
      <StatusBar style="auto" translucent={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
})
