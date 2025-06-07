import { User } from "@/types/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  hasHydrated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
  setHydrated: () => void;
};

export function getAuthTokensFromLocalStorage() {
  const accessToken = localStorage.getItem("auth-storage");
  if (accessToken) {
    const parsed: { state: AuthState } = JSON.parse(accessToken);
    // const user = parsed.state.user
    return parsed.state.token;
  }
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,

      setUser: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: !!token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      setToken: (token) => set({ token }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated()
        }
      }
    }
  )
)
