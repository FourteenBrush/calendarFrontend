const DAYS_A_WEEK = 7

export const daysInMonth = (today: Date) => {
  return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
}

export type Day = {
  date: Date,
  dayOfWeek: typeof daysOfTheWeek[number],
  isCurrentMonth: boolean,
}

const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

export const getCalendarDays = (year: number, month: number): Day[] => {
  const firstDayOfMonth = new Date(year, month - 1, 1)
  const daysPrepended = (firstDayOfMonth.getDay() + 6) % DAYS_A_WEEK

  const dayCount = new Date(year, month, 0).getDate()
  return Array.from(
    { length: dayCount + daysPrepended },
    (_, i) => ({
      date: new Date(year, month - 1, i + 1 - daysPrepended),
      dayOfWeek: daysOfTheWeek[(i + daysPrepended + 1) % DAYS_A_WEEK],
      isCurrentMonth: i >= daysPrepended,
    }),
  )
}
//for (let month = 1; month <= 12; month++) {
//  const days = getCalendarDays(2024, month)
//  console.info("month", month)
//  console.info(days.map(day => {
//     return { date: day.date.toLocaleDateString(), isCurrentMonth: day.isCurrentMonth }
//  }))
//}
