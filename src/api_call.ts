const BASE_URL = process.env.API_BASE_URL
if (BASE_URL == null) {
  throw new Error("env variable API_BASE_URL must be set")
}

