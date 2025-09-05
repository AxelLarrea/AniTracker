import { create } from "zustand";
import authService from "../services/authService";
import type { authProps, authStoreProps } from "../types/auth.types";

export const useAuthStore = create<authStoreProps>((set) => ({
  user: null,
  profile: null,
  isLoading: true,

  // Operaciones
  login: async ({ email, password }: authProps) => {
    try{
      set({ isLoading: true });
      const user = await authService.login({ email, password });
      set({ user });
    }finally{
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null });
  },

  signUp: async ({ email, password }: authProps) => {
    try{
      set({ isLoading: true });
      const user = await authService.signUp({ email, password });
      set({ user });
    }finally{
      set({ isLoading: false });
    }
  },
  
}));