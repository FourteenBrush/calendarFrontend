import React, { FlatList, StyleSheet } from "react-native"
import CalendarGrid from "@/components/CalendarGrid"
import CalendarHeader from "@/components/CalendarHeader"
import { useRef, useState } from "react"
import { Day, getCalendarDays } from "@/utils"

export default () => {
  const today = new Date()
  const calendarDays = getCalendarDays(today.getFullYear(), today.getMonth() + 1)
  const cellsRef = useRef<FlatList<Day> | null>(null)
  const [days, setDays] = useState(calendarDays)

  // TODO: store calendar state here, together with service
  
  // TODO: index does not consider extra days of month prepended
  const scrollToToday = () => {
    const today = new Date()
    cellsRef.current?.scrollToIndex({ index: today.getDate() - 1, animated: true })
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
