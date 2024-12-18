import { StatusBar } from "expo-status-bar"
import { ThemeProvider, useTheme } from "@/hooks/useTheme"
import { StyleSheet, View } from "react-native"
import Calendar from "@/components/Calendar"
import * as theme from "@/styles/theme"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createNativeStackNavigator()

export default () => (
  <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Calendar"
          component={CalendarScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
)


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
