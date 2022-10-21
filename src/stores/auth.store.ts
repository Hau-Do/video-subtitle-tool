import create from 'zustand'
import { persist } from 'zustand/middleware'

interface ITokens {
  accessToken: string
  refreshToken: string
}

interface IAuthState {
  user: object
  isLoading: false
  rebound: true
  tokens: ITokens
  logoutAction: () => void
}
type Keys = keyof IAuthState
const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      user: {},
      isLoading: false,
      rebound: true,
      tokens: {
        accessToken: '',
        refreshToken: ''
      },

      logoutAction: () => {
        set({
          user: {},
          isLoading: false,
          rebound: true,
          tokens: {
            accessToken: '',
            refreshToken: ''
          }
        })
      }
    }),
    {
      name: 'auth'
    }
  )
)

export default useAuthStore
