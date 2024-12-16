export const DAYS_PER_WEEK = 7
export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const

export const daysInMonth = (today: Date) => {
  return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
}

export const dateToMonthAndYear = (date: Date): string => {
  const month = MONTHS_LONG[date.getMonth()]
  return `${month} ${date.getFullYear()}`
}

export const getDayOfMonth = (): number => new Date().getDate()

export type Day = Readonly<{
  date: Date,
  weekDay: WeekDay,
  isCurrentMonth: boolean,
}>

// DO NOT REORDER
export enum WeekDay {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

const isLeapYear = (year: number): boolean => {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
}

export const getCalendarDays = (year: number, monthIdx: number): Day[] => {
  const firstDayOfYear = new Date(year, monthIdx, 1)
  const daysPrepended = (firstDayOfYear.getDay() + 6) % DAYS_PER_WEEK
  const dayCount = daysPrepended + (isLeapYear(year) ? 366 : 365)
  const daysAppended = (DAYS_PER_WEEK - dayCount % DAYS_PER_WEEK) % DAYS_PER_WEEK

  return Array.from(
    { length: dayCount + daysAppended },
    (_, i) => {
      const date = new Date(year, monthIdx, i + 1 - daysPrepended)
      const weekDay = (i % DAYS_PER_WEEK) as WeekDay
      const isCurrentMonth = monthIdx === date.getMonth() && year === date.getFullYear()
      return { date, weekDay, isCurrentMonth }
    }
  )
}

//console.table(getCalendarDays(2024, 12).map(day => ({
//  date: day.date.toLocaleDateString(),
//  isCurrentMonth: day.isCurrentMonth,
//  weekDay: day.weekDay,
//})))
