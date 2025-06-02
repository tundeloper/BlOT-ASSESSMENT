import { User } from '@/types/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  setUser: (data: User) => void
  logout: () => void,
  setToken: (tokens: string) => void;
}

export function getAuthTokensFromLocalStorage(): string {
  const accessToken = localStorage.getItem("access-token") || "";
  return accessToken ;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (data) =>
        set({ user: data, isAuthenticated: !!getAuthTokensFromLocalStorage() }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setToken: (token) => localStorage.setItem("access-token", token)
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)
