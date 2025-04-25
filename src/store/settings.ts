import { create } from 'zustand'

interface Settings {
  darkMode: boolean
  onlyFavorites: boolean
  setDarkMode(value: boolean): void
  setOnlyFavorites(value: boolean): void
}

export const useSettings = create<Settings>()((set) => ({
  darkMode: false,
  onlyFavorites: false,
  setDarkMode: (value) => set(() => ({ darkMode: value })),
  setOnlyFavorites: (value) => set(() => ({ onlyFavorites: value })),
}))
