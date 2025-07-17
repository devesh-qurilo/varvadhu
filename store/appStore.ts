import { create } from 'zustand';

type AppStore = {
  isOnboarded: boolean;
  user: { name: string } | null;
  setOnboarded: () => void;
  login: (user: { name: string }) => void;
  logout: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isOnboarded: false,
  user: null,
  setOnboarded: () => set({ isOnboarded: true }),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
