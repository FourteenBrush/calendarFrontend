import React, { StyleSheet, Text, View } from "react-native"
import CalendarGrid from "@/components/CalendarGrid"
import { useEffect, useState } from "react"
import { Day } from "@/utils"
import { getCalendarItemsInPeriod } from "@/api_calls"
import { useAuth } from "@/hooks/useAuth"

const Calendar = () => {
  const { accessToken } = useAuth()
  const [cells, setCells] = useState<Day[] | null>(null)

  const fetchData = async () => {
    try {
      const today = new Date()
      today.setMonth(today.getMonth() - 6) // TODO
      const calendarDays = await getCalendarItemsInPeriod(accessToken!, new Date())

      setCells(calendarDays)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { fetchData() }, [])


  return (
    <View style={styles.container}>
      {
        cells == null
          ? <Text>Loading..</Text>
          : <CalendarGrid cells={cells} setCells={setCells} />
      }
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
