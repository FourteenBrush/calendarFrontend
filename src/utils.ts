export const DAYS_PER_WEEK = 7
export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

export const daysInMonth = (today: Date) => {
  return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
}

export type Day = {
  date: Date,
  dayOfWeek: typeof WEEK_DAYS[number],
  isCurrentMonth: boolean,
}

export const getCalendarDays = (year: number, month: number): Day[] => {
  const firstDayOfMonth = new Date(year, month - 1, 1)
  const daysPrepended = (firstDayOfMonth.getDay() + 6) % DAYS_PER_WEEK

  const dayCount = new Date(year, month, 0).getDate()
  return Array.from(
    { length: daysPrepended + dayCount },
    (_, i) => ({
      date: new Date(year, month - 1, i + 1 - daysPrepended),
      dayOfWeek: WEEK_DAYS[i % DAYS_PER_WEEK],
      isCurrentMonth: i >= daysPrepended,
    }),
  )
}

//for (let month = 1; month <= 12; month++) {
//  console.table(getCalendarDays(2024, month).map(day => ({
//    data: day.date.toLocaleDateString(),
//    isCurrentMonth: day.isCurrentMonth,
//    dayOfWeek: day.dayOfWeek,
//  })))
//}
