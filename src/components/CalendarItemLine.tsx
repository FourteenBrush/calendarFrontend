import { StyleSheet, Text, View } from "react-native"

const CalendarItemLine = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: "flex-end",
    marginTop: 2,
    marginHorizontal: 2,
    borderRadius: 4,
    //backgroundColor: "#9da04b",
    backgroundColor: "#7f823e",
  },
  text: {
    paddingLeft: 3,
    color: "#e0d6ce",
    fontSize: 12,
  },
})

export default CalendarItemLine
