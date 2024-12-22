import { register } from "@/api_calls"
import ErrorLabel from "@/components/ErrorLabel"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import { FormErrors, validateFormData } from "@/utils"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { z } from "zod"

const registerScheme = z.object({
  email: z.string().email({ message: "Not a valid email" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
})

type Errors = FormErrors<typeof registerScheme>

const RegisterScreen = () => {
  const { theme } = useTheme()
  const { setAuthStatus } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Errors>({})

  const handleSignin = async () => {
    const { errors } = validateFormData({ email, password }, registerScheme)
    if (errors != null) {
      setErrors(errors)
      return
    }

    setErrors({})
    try {
      const accessToken = await register(email, password)
      setAuthStatus({ accessToken })
      // redirect happens automatically
    } catch (error) {
      setErrors({ globalError: "An internal error happened while signing you up.." })
    }
  }

  return (
    <View style={styles.container}>
      {/* form wrapper */}
      <View>
        <Text style={[theme.titleBig, styles.signUpText]}>Sign up</Text>

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

        <Button color="#334244" title="Sign up" onPress={handleSignin} />
        <ErrorLabel error={errors.globalError} style={styles.error} />
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
  signUpText: {
    paddingBottom: 12,
  },
  error: {
    // TODO: figure out why error label always stretches components
    flexGrow: 0,
  },
})

export default RegisterScreen
