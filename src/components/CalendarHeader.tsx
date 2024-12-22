import { useTheme } from "@/hooks/useTheme"
import { GestureResponderEvent, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import HoverableOpacity from "@/components/HoverableOpacity"
import * as theme from "@/styles/theme"
import { useAuth } from "@/hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { NavParamsList } from "../../App"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CalendarItem } from "@/utils"

export type CalendarHeaderProps = {
  onTodayButtonPress: (event: GestureResponderEvent) => void,
  updateItem: (newState: CalendarItem) => void,
  style?: StyleProp<ViewStyle>,
  monthTitle: string,
}

export default ({ onTodayButtonPress, monthTitle, style }: CalendarHeaderProps) => {
  const { theme } = useTheme()
  const { setAuthStatus } = useAuth()
  const navigator = useNavigation<NativeStackNavigationProp<NavParamsList>>()

  const logout = async () => await setAuthStatus(false)

  return (
    <View style={[styles.container, style]}>
      <HoverableOpacity
        onPress={onTodayButtonPress}
        style={[styles.button, styles.todayButton]}
        hoverStyle={styles.buttonHover}
        activeOpacity={0.45}
      >
        <Text style={[theme.textPrimary, styles.buttonText]}>Today</Text>
      </HoverableOpacity>

      <Text style={[styles.text, theme.textPrimary]}>Current month: {monthTitle}</Text>

      <HoverableOpacity
        style={[styles.button, styles.newItemButton]}
        hoverStyle={styles.buttonHover}
        activeOpacity={0.45}
      >
        <Text style={[theme.textPrimary, styles.buttonText]}>New Item</Text>
      </HoverableOpacity>

      <HoverableOpacity
        onPress={logout}
        style={[styles.button, styles.logoutButton]}
        hoverStyle={styles.buttonHover}
        activeOpacity={0.45}
      >
        <Text style={[theme.textPrimary, styles.buttonText]}>Logout</Text>
      </HoverableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 10,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#282828",
    backgroundColor: "#232124",
  },
  todayButton: {
    marginRight: 40,
  },
  newItemButton: {
    marginLeft: 24,
  },
  logoutButton: {
    marginLeft: 40,
  },
  buttonHover: {
    opacity: theme.HOVER_OPACITY,
  },
  text: { fontSize: 20 },
  buttonText: { fontSize: 18 },
})
