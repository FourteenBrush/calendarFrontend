import { useTheme } from "@/hooks/useTheme"
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native"

export type ErrorLabelProps = {
  error: string | undefined,
  style?: StyleProp<TextStyle>,
}

const ErrorLabel = ({ error, style }: ErrorLabelProps) => {
  const { theme } = useTheme()

  if (error == null) return null

  return (
    <Text style={[theme.textPrimary, styles.text, style]}>{error}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#dc3545",
  }
})

export default ErrorLabel
