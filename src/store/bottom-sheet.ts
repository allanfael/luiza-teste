import { create } from 'zustand'

interface BottomSheet {
  showBottomSheet: boolean
  setShowBottomSheet(value: boolean): void
}

export const useBottomSheet = create<BottomSheet>()((set) => ({
  showBottomSheet: false,
  setShowBottomSheet: (data) =>
    set(() => ({
      showBottomSheet: data,
    })),
}))
