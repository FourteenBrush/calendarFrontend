import React, { FlatList, StyleSheet } from "react-native"
import CalendarGrid from "@/components/CalendarGrid"
import CalendarHeader from "@/components/CalendarHeader"
import { useRef, useState } from "react"
import { Day, DAYS_PER_WEEK, getCalendarDays } from "@/utils"

export default () => {
  const today = new Date()
  const calendarDays = getCalendarDays(today.getFullYear(), today.getMonth() + 1)
  const cellsRef = useRef<FlatList<Day> | null>(null)
  const [days, setDays] = useState(calendarDays)

  // TODO: index does not consider extra days of month prepended
  const scrollToToday = () => {
    const today = new Date().getDate()
    // NOTE: scrollToIndex requires an index into the logical row
    const index = days.findIndex(day => day.date.getDate() === today) / DAYS_PER_WEEK
    cellsRef.current?.scrollToIndex({ index, animated: true })
  }

  return (
    <>
      <CalendarHeader 
        onTodayButtonPress={scrollToToday} 
        style={styles.header}
      />
      <CalendarGrid listRef={cellsRef} days={days} />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
  }
})
