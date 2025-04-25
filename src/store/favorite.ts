import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { storage } from './storage'

interface FavoriteState {
  ids: number[]
  save: (id: number) => void
}

export const useFavoriteStore = create<FavoriteState>()(
  devtools(
    persist(
      (set, get) => ({
        ids: [],
        save: (id) => set(() => {
          const ids = get().ids;
          const isAlreadyFavorite = ids.includes(id);
        
          return {
            ids: isAlreadyFavorite
              ? ids.filter(item => item !== id) 
              : [...ids, id] 
          };
        }),
      }),
      { name: 'favorite', storage: createJSONStorage(() => storage) },
    ),
  ),
)
