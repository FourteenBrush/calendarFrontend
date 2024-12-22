import React from "react"
import { ThemeProvider, useTheme } from "@/hooks/useTheme"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import CalendarScreen from "@/screens/CalendarScreen"
import CalendarItemScreen from "@/screens/CalendarItemScreen"
import LoginScreen from "@/screens/LoginScreen"
import { AuthProvider, useAuth } from "@/hooks/useAuth"
import { CalendarItem } from "@/utils"
import RegisterScreen from "@/screens/RegisterScreen"

/**
 * A mapping between screen names and the respective
 * navigation props they receive, for typechecking only.
 * See `useNavigation()`.
 */
export type NavParamsList = {
  details: { passedItem: CalendarItem | null, updateItem: (e: CalendarItem) => void },
  calendar: undefined,
  login: undefined,
  register: undefined,
}

const Stack = createNativeStackNavigator<NavParamsList>()

export default () => (
  <ThemeProvider>
    <AuthProvider>
      <NavigationContent />
    </AuthProvider>
  </ThemeProvider>
)

const NavigationContent = () => {
  const { theme } = useTheme()
  const { hasAuth } = useAuth()
  const hideHeader = { headerShown: false }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ contentStyle: theme.root }}>
        {hasAuth ? (
          <>
            <Stack.Screen name="calendar" component={CalendarScreen} options={hideHeader} />
            <Stack.Screen name="details" component={CalendarItemScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} options={hideHeader} />
            <Stack.Screen name="register" component={RegisterScreen} options={hideHeader} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
