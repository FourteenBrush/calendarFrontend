import { register } from "@/api_calls"
import ErrorLabel from "@/components/ErrorLabel"
import HoverableOpacity from "@/components/HoverableOpacity"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import * as theme from "@/styles/theme"
import { FormErrors, validateFormData } from "@/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { z } from "zod"
import { NavParamsList } from "../../App"
import { loginScheme } from "@/screens/LoginScreen"

const registerScheme = loginScheme.extend({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(255, { message: "First name must be at most 255 characters long" }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(255, { message: "Last name must be at most 255 characters long" }),
})

type Errors = FormErrors<typeof registerScheme>

export type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<NavParamsList, "register">,
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { theme } = useTheme()
  const { setAuthStatus } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Errors>({})

  const navigateToSignIn = () => navigation.popTo("login")

  const handleSignup = async () => {
    const { errors } = validateFormData({ email, password, firstName, lastName }, registerScheme)
    if (errors != null) {
      setErrors(errors)
      return
    }

    setErrors({})
    try {
      const accessToken = await register(firstName, lastName, email, password)
      setAuthStatus({ accessToken })
      // redirect happens automatically
    } catch (error) {
      setErrors({ globalError: "An internal error happened while signing you up.." })
      console.error("error while signing up:", error)
    }
  }

  return (
    <View style={styles.container}>
      {/* form wrapper */}
      <View style={styles.form}>
        <Text style={[theme.titleBig, styles.signUpText]}>Sign up</Text>

        <TextInput
          onChangeText={setFirstName}
          placeholder="First name"
          style={theme.formField}
        />
        <ErrorLabel error={errors.firstName} />

        <TextInput
          onChangeText={setLastName}
          placeholder="Last name"
          style={theme.formField}
        />
        <ErrorLabel error={errors.lastName} />

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

        <Button color="#334244" title="Sign up" onPress={handleSignup} />
        <ErrorLabel error={errors.globalError} style={styles.error} />

        <HoverableOpacity onPress={navigateToSignIn} hoverStyle={styles.hover} style={styles.backToSignIn}>
          <Text style={theme.textPrimary}>Back to sign in</Text>
        </HoverableOpacity>
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
  form: {
    width: "100%",
    maxWidth: theme.FORM_MAX_WIDTH,
  },
  signUpText: {
    paddingBottom: 12,
  },
  backToSignIn: {
    width: "100%",
    flex: 1,
    paddingTop: 12,
  },
  hover: {
    opacity: theme.HOVER_OPACITY,
  },
  error: {
    // TODO: figure out why error label always stretches components
    flexGrow: 0,
  },
})

export default RegisterScreen
