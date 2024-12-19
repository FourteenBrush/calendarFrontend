import Calendar from "@/components/Calendar"
import { useTheme } from "@/hooks/useTheme"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import * as theme from "@/styles/theme"

const CalendarScreen = () => {
  const { theme } = useTheme()
  return (
    <View style={[theme.root, styles.app]}>
      <Calendar />
      <StatusBar style="auto" translucent={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.APP_CONTAINER_PADDING,
  },
})

export default CalendarScreen
