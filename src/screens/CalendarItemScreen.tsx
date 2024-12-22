import { RouteProp } from "@react-navigation/native"
import { Button, StyleSheet, TextInput, View } from "react-native"
import { NavParamsList } from "../../App"
import { useTheme } from "@/hooks/useTheme"
import { useRef, useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CalendarItem } from "@/utils"

export type CalendarItemScreenProps = {
  route: RouteProp<NavParamsList, "details">,
  navigation: NativeStackNavigationProp<NavParamsList, "details">,
}

const CalendarItemScreen = ({ route, navigation }: CalendarItemScreenProps) => {
  const { theme } = useTheme()
  const { passedItem, updateItem } = route.params

  const [item, setItem] = useState<CalendarItem | null>(passedItem)
  const isDirty = useRef(false)

  const handleFieldChange = (field: keyof typeof item, value: any) => {
    const { passedItem } = route.params

    setItem((prev) => (prev ? { ...prev, [field]: value } : null))
    isDirty.current = true
  }

  const saveItem = () => {
    if (!isDirty.current) return

    updateItem(item)
    navigation.pop()
  }

  return (
    <View style={styles.container}>
      <View>
        {/* form wrapper */}
        <TextInput
          value={item?.title}
          onChangeText={(text) => handleFieldChange("title", text)}
          style={theme.formField}
        />

        <Button title="Save" onPress={saveItem} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default CalendarItemScreen
