import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { storage } from './storage'

interface UserState {
  email: string | null
  save: (email: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        email: null,
        save: (email) => set(() => ({ email })),
        logout() {
          set((state) => ({
            ...state,
            email: null,
          }))
        },
      }),
      { name: 'user', storage: createJSONStorage(() => storage) },
    ),
  ),
)
