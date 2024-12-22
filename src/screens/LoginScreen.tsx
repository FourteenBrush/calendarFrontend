import { login } from "@/api_calls"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { NavParamsList } from "../../App"
import { useTheme } from "@/hooks/useTheme"
import { useAuth } from "@/hooks/useAuth"

export type LoginScreenProps = NativeStackScreenProps<NavParamsList, "login">

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { theme } = useTheme()
  const { setAuthStatus } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      // TODO: validation
      const accessToken = await login(email, password)
      setAuthStatus({ accessToken })
      // no navigation call is needed because the navigation container
      // automatically mounts new screens after authentication
    } catch (error) {
      console.error("error while logging in:", error)
      // TODO: show to user
    }
  }

  const handleSignup = () => navigation.popTo("register")

  return (
    <View style={[styles.container, theme.loginScreenRoot]}>
      {/* form wrapper */}
      <View>
        <TextInput 
          inputMode="email"
          onChangeText={setEmail}
          placeholder="Email"
          style={theme.formField}
        />
        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          style={theme.formField}
        />
        <Button color="#334244" title="Sign in" onPress={handleLogin} />

        <View style={styles.signUp}>
          <Text style={theme.textPrimary}>Not a member?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={theme.textPrimary}>Sign up</Text>
          </TouchableOpacity>
        </View>
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
  signUp: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
  },
})

export default LoginScreen
