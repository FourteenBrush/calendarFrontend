import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"
import { Platform, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { isValidAccessToken } from "@/api_calls"
import { useTheme } from "./useTheme"

/** Auth status type to signify unauthenticated or logged in with a token */
export type AuthStatus = false | { accessToken: string }

export type AuthContextValues = {
  hasAuth: boolean,
  setAuthStatus: (status: AuthStatus) => Promise<void>,
  accessToken: string | null,
}

const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  const initAuth = async () => {
    try {
      const storedToken = Platform.OS === "web"
        ? await AsyncStorage.getItem("token")
        : await SecureStore.getItemAsync("token")

      if (storedToken == null) {
        // new auth cycle required
        setAccessToken(null)
        return
      }

      const isValid = await isValidAccessToken(storedToken)
      console.info({isValid})
      // FIXME: is valid is always false
      if (isValid) {
        setAccessToken(storedToken)
      } else {
        await ejectToken()
        setAccessToken(null)
      }
    } catch (error) {
      await ejectToken()
      setAccessToken(null)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const ejectToken = async () => {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem("token")
    } else {
      await SecureStore.deleteItemAsync("token")
    }
  }

  useEffect(() => { initAuth() }, [])

  const setAuthStatus = async (status: AuthStatus) => {
    if (status === false) {
      setAccessToken(null)
      await ejectToken()
    } else {
      setAccessToken(status.accessToken)

      if (Platform.OS === "web") {
        await AsyncStorage.setItem("token", status.accessToken)
      } else {
        await SecureStore.setItemAsync("token", status.accessToken)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ hasAuth: accessToken != null, setAuthStatus, accessToken }}>
      {isLoading ? <Text style={theme.textPrimary}>Loading..</Text> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  if (auth == null) {
    throw new Error("no auth provider found, did you forget to wrap your component with one?")
  }
  return auth
}
