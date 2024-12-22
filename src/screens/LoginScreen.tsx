import { login } from "@/api_calls"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { NavParamsList } from "../../App"
import { useTheme } from "@/hooks/useTheme"
import { useAuth } from "@/hooks/useAuth"
import * as theme from "@/styles/theme"
import HoverableOpacity from "@/components/HoverableOpacity"
import { z } from "zod"
import { FormErrors } from "@/utils"
import ErrorLabel from "@/components/ErrorLabel"

export const loginScheme = z.object({
  email: z.string().email({ message: "Not a valid email" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
})

type Errors = FormErrors<typeof loginScheme>

export type LoginScreenProps = NativeStackScreenProps<NavParamsList, "login">

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { theme } = useTheme()
  const { setAuthStatus } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Errors>({})

  const handleLogin = async () => {
    try {
      // TODO: validation
      const accessToken = await login(email, password)
      await setAuthStatus({ accessToken })
      // no navigation call is needed because the navigation container
      // automatically mounts new screens after authentication
    } catch (error) {
      setErrors({ globalError: "An internal error happened while signing you in.." })
      console.error("error while logging in:", error)
      // TODO: show to user
    }
  }

  const handleSignup = () => navigation.popTo("register")

  return (
    <View style={[styles.container, theme.loginScreenRoot]}>
      {/* form wrapper */}
      <View style={styles.form}>
        <Text style={[theme.titleBig,, styles.signInText]}>Sign in</Text>

        <TextInput 
          inputMode="email"
          onChangeText={setEmail}
          placeholder="Email"
          style={theme.formField}
        />
        <ErrorLabel error={errors.email} />

        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Password"
          style={theme.formField}
        />
        <ErrorLabel error={errors.password} />

        <Button color="#334244" title="Sign in" onPress={handleLogin} />
        <ErrorLabel error={errors.globalError} />

        <View style={styles.signUp}>
          <Text style={theme.textPrimary}>Not a member?</Text>
          <HoverableOpacity hoverStyle={styles.hover} onPress={handleSignup}>
            <Text style={theme.textPrimary}>Sign up</Text>
          </HoverableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: theme.FORM_ALIGN_ITEMS,
    padding: theme.FORM_PADDING,
  },
  form: {
    width: "100%",
    maxWidth: theme.FORM_MAX_WIDTH,
  },
  signInText: {
    paddingBottom: 12,
  },
  hover: {
    opacity: theme.HOVER_OPACITY,
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
