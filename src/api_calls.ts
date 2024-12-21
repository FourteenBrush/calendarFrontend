import axios from "axios"

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
if (BASE_URL == null) {
  throw new Error("env variable API_BASE_URL must be set")
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email, password,
  })
}
