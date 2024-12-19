import { ThemeProvider } from "@/hooks/useTheme"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import CalendarScreen from "@/screens/CalendarScreen"

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
