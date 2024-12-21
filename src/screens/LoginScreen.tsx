import { login } from "@/api_calls"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { NavParamsList } from "../../App"

export type LoginScreenProps = NativeStackScreenProps<NavParamsList, "login">

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      await login(email, password)
      navigation.popTo("calendar")
    } catch (error) {

    }
  }

  const handleSignup = () => navigation.popTo("register")

  return (
    <View style={styles.container}>
      {/* form wrapper */}
      <View>
        <TextInput inputMode="email" onChangeText={setEmail} placeholder="Email" style={styles.formField} />
        <TextInput secureTextEntry onChangeText={setPassword} placeholder="Password" style={styles.formField} />
        <Button color="#334244" title="Sign in" onPress={handleLogin} />

        <View style={styles.signUp}>
          <Text>Not a member?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text>Sign up</Text>
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
  formField: {
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 5,
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
