import { z, ZodObject, ZodRawShape, ZodType } from "zod"

export const DAYS_PER_WEEK = 7
export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

export const MONTHS_LONG = [
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

export const dateToMonth = (d: Date): string => {
  return MONTHS_LONG[d.getMonth()]
}

export const getDayOfMonth = (): number => new Date().getDate()

export type Day = {
  readonly date: Date,
  readonly weekDay: WeekDay,
  readonly isCurrentMonth: boolean,
  items: CalendarItem[],
}

export type CalendarItem = CalendarEvent | CalendarTask
export type SharedCalendarData = {
  id: number,
  title: string,
  description: string,
  endDate: Date,
}

export type CalendarEvent = SharedCalendarData & {
  startDate: Date,
  isAllDay: boolean,
}

export type CalendarTask = SharedCalendarData & {
  isCompleted: boolean,
}

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

export const getCalendarDays = (year: number, monthIdx: number, calendarItems: CalendarItem[]): Day[] => {
  const firstDayOfYear = new Date(year, monthIdx, 1)
  const daysPrepended = (firstDayOfYear.getDay() + 6) % DAYS_PER_WEEK
  const dayCount = daysPrepended + (isLeapYear(year) ? 366 : 365)
  const daysAppended = (DAYS_PER_WEEK - dayCount % DAYS_PER_WEEK) % DAYS_PER_WEEK

  const isDateInRangeOfItem = (d: Date, item: CalendarItem): boolean => {
    const isTask = "completed" in item
    if (isTask) {
      const { endDate } = item
      return d.getDate() === endDate.getDate() && d.getMonth() === endDate.getMonth() && d.getFullYear() === endDate.getFullYear()
    }
    return d >= (item as any).startDate && d <= item.endDate
  }

  return Array.from(
    { length: dayCount + daysAppended },
    (_, i) => {
      const date = new Date(year, monthIdx, i + 1 - daysPrepended)
      const weekDay = (i % DAYS_PER_WEEK) as WeekDay
      const isCurrentMonth = monthIdx === date.getMonth() && year === date.getFullYear()
      // FIXME: performance boost with binary search, currently O(D * N)
      const items = calendarItems.filter(item => isDateInRangeOfItem(date, item))
      return { date, weekDay, isCurrentMonth, items }
    }
  )
}

//console.table(getCalendarDays(2024, 12).map(day => ({
//  date: day.date.toLocaleDateString(),
//  isCurrentMonth: day.isCurrentMonth,
//  weekDay: day.weekDay,
//})))

// typescript craziness begins here
export type FormErrors<T extends ZodType<any, any, any>> = Partial<Record<keyof z.infer<T>, string>> & {
  globalError?: string,
}

/**
 * Union of validation results, where either `data` is set, or `errors` is.
 * `errors` always contains the first error encountered
 */
export type ValidationResult<T> =
  { data: T, errors?: undefined } |
  { data?: undefined, errors: Partial<Record<keyof T, string>> }

export const validateFormData = <T extends ZodRawShape>(
  data: z.infer<ZodObject<T>>,
  scheme: z.ZodObject<T>,
): ValidationResult<z.infer<ZodObject<T>>> => {
  const { success, error } = scheme.safeParse(data)

  if (success) return { data }

  const errorMap = error.flatten().fieldErrors
  const errors = Object.fromEntries(
    Object.keys(data).map(key => {
      const error = errorMap[key as keyof typeof errorMap]?.at(0)
      return [key, error]
    })
  ) as Partial<Record<keyof T, string>>

  return { errors }
}
