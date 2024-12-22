import React, { FlatList, StyleSheet, View } from "react-native"
import CalendarGrid from "@/components/CalendarGrid"
import CalendarHeader from "@/components/CalendarHeader"
import { useRef, useState } from "react"
import { dateToMonthAndYear, Day, DAYS_PER_WEEK, getCalendarDays } from "@/utils"

const Calendar = () => {
  const cellsRef = useRef<FlatList<Day> | null>(null)
  const today = new Date()
  const [cells, setCells] = useState(
    getCalendarDays(today.getFullYear(), today.getMonth())
  )

  const scrollToToday = () => {
    const today = new Date().getDate()
    const rowIndex = cells.findIndex(day => day.date.getDate() === today) / DAYS_PER_WEEK
    cellsRef.current?.scrollToIndex({ index: rowIndex, animated: true })
  }

  return (
    <View style={styles.container}>
      <CalendarHeader 
        onTodayButtonPress={scrollToToday} 
        monthTitle={dateToMonthAndYear(today)}
      />
      <CalendarGrid listRef={cellsRef} cells={cells} setCells={setCells} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
})

export default Calendar
