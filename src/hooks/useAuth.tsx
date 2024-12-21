import { createContext, PropsWithChildren, useContext, useState } from "react";

export type AuthContextValues = {
  isAuthenticated: boolean,
  setIsAuthenticated: (auth: boolean) => void,
}

const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  if (auth == null) {
    throw new Error("no auth provider found, did you forget to wrap your component with one?")
  }
  return auth
}
