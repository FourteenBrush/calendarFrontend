import { useTheme } from "@/hooks/useTheme"
import { useState } from "react"
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"

export type CalendarHeaderProps = {
  onTodayButtonPress: (event: GestureResponderEvent) => void,
  style?: StyleProp<ViewStyle>,
}

export default ({ onTodayButtonPress, style }: CalendarHeaderProps) => {
  const { theme } = useTheme()
  const [hoveringTodayButton, setHoveringTodayButton] = useState(false)

  // FIXME: create a HoverableOpacity component
  return (
    <View style={[styles.container, style]}>
      <View 
        onPointerEnter={() => setHoveringTodayButton(true)}
        onPointerLeave={() => setHoveringTodayButton(false)}>
        <TouchableOpacity
          onPress={onTodayButtonPress}
          style={[styles.todayButton, hoveringTodayButton && styles.todayButtonHover]}
          activeOpacity={0.45}>
          <Text style={[theme.textPrimary, styles.todayText]}>Today</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.text, theme.textPrimary]}>December 2024</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  todayButton: {
    marginRight: 40,
    paddingHorizontal: 18,
    paddingVertical: 7,
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
