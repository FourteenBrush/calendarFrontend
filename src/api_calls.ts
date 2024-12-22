import axios from "axios"

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

export const register = async (email: string, password: string): Promise<string> => {
  const response = await axios.post("/auth/register", { email, password })
  return response.data["access_token"]
}
