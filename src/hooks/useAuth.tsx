import { createContext, PropsWithChildren, useContext, useState } from "react";

/** Auth status type to signify unauthenticated or logged in with a token */
export type AuthStatus = false | { accessToken: string }

export type AuthContextValues = {
  hasAuth: boolean,
  setAuthStatus: (status: AuthStatus) => void,
  accessToken: string | null,
}

const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const setAuthStatus = (status: AuthStatus) => {
    setAccessToken(status === false ? null : status.accessToken)
  }

  return (
    <AuthContext.Provider value={{ hasAuth: accessToken != null, setAuthStatus, accessToken }}>
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
