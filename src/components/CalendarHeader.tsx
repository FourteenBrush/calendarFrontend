import { useTheme } from "@/hooks/useTheme"
import { GestureResponderEvent, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import HoverableOpacity from "./HoverableOpacity"

export type CalendarHeaderProps = {
  onTodayButtonPress: (event: GestureResponderEvent) => void,
  style?: StyleProp<ViewStyle>,
  monthTitle: string,
}

export default ({ onTodayButtonPress, monthTitle, style }: CalendarHeaderProps) => {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, style]}>
      <HoverableOpacity
        onPress={onTodayButtonPress}
        style={styles.todayButton}
        hoverStyle={styles.todayButtonHover}
        activeOpacity={0.45}
      >
        <Text style={[theme.textPrimary, styles.todayText]}>Today</Text>
      </HoverableOpacity>

      <Text style={[styles.text, theme.textPrimary]}>{monthTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  todayButton: {
    marginRight: 40,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#282828",
    backgroundColor: "#232124",
  },
  todayButtonHover: {
    opacity: 0.65,
  },
  text: { fontSize: 20 },
  todayText: { fontSize: 18 },
})
