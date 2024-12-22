import axios from "axios"
import { CalendarItem, Day, getCalendarDays } from "./utils"

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
if (BASE_URL == null) {
  throw new Error("env variable API_BASE_URL must be set")
}

axios.defaults.baseURL = BASE_URL

/** @returns a promise which may resolve with an access token */
export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post("/auth/login", { email, password })
  return response.data["access_token"]
}

export const register = async (
  firstName: string, lastName: string, email: string, password: string,
): Promise<string> => {
  const response = await axios.post("/auth/register", { firstName, lastName, email, password })
  return response.data["access_token"]
}

export const getCalendarItemsInPeriod = async (
  accessToken: string, start: Date,
): Promise<Day[]> => {
  const end = new Date(start)
  end.setMonth(start.getMonth() + 12) 
  // always retrieve a full year of data, might be configurable in the future
  console.debug("retrieving data for the period %s - %s", start.toLocaleDateString(), end.toLocaleDateString())

  const response = await axios.get("/calendar/items", {
    params: { start: toUTCDateStr(start), end: toUTCDateStr(end) },
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const items = (response.data as CalendarItem[])
  // api specifies this to be a Date, but gets returned as a string
  items.forEach(day => day.endDate = new Date((day as any).end))

  return getCalendarDays(start.getFullYear(), start.getMonth(), items)
}

export const isValidAccessToken = async (accessToken: string): Promise<boolean> => {
  const response = await axios.post("/auth/valid", { token: accessToken })
  return response.data
}

const toUTCDateStr = (d: Date) => d.toISOString().split("T")[0]
