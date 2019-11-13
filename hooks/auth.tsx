import Cookies from 'js-cookie'
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState
} from 'react'

interface AuthProps {
  token?: string

  login: (token: string) => void
  logout: () => void
}

const auth = createContext<AuthProps>({
  login: () => {},
  logout: async () => {}
})

const useProvideAuth = () => {
  const [token, setToken] = useState<string | undefined>(Cookies.get('token'))

  const login = (token: string) => {
    Cookies.set('token', token)

    setToken(token)
  }

  const logout = () => {
    Cookies.remove('locationId')
    Cookies.remove('token')

    setToken(undefined)
  }

  return {
    login,
    logout,

    token
  }
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  const value = useProvideAuth()

  return <auth.Provider value={value}>{children}</auth.Provider>
}

export const useAuth = () => useContext(auth)
