import { create } from "zustand";
import authService from "../services/authService";
import type { authStoreProps, loginProps, signupProps } from "../types/auth.types";

export const useAuthStore = create<authStoreProps>((set, get) => ({
  user: null,
  isLoading: false,
  authUnsubscribe: null,

  // -- Listener
  // Inicializar listener de sesión
  initialize: async () => {
    try {
      set({ isLoading: true });
      const session = await authService.getSession();
      set({ user: session?.user });

      const unsubscribe = authService.onAuthStateChange((user) => set({ user }));
      set({ authUnsubscribe: unsubscribe });
    } finally{
      set({ isLoading: false });
    }
  },

  // Limpiar listener de sesión
  cleanup: () => {
    const { authUnsubscribe } = get();
    if(authUnsubscribe) {
      authUnsubscribe()
      set({ authUnsubscribe: null})
    }
  },

  // -- Operaciones
  // Iniciar sesión
  login: async ({ email, password }: loginProps) => {
    try{
      set({ isLoading: true });
      const user = await authService.login({ email, password });
      set({ user: user.user });
    }finally{
      set({ isLoading: false });
    }
  },

  // Cierrar sesión
  logout: async () => {
    await authService.logout();
    set({ user: null });
  },

  // Registrarse
  signUp: async ({ email, password, display_name }: signupProps) => {
    try{
      set({ isLoading: true });
      const user = await authService.signUp({ email, password, display_name });
      set({ user: user.user });
    }finally{
      set({ isLoading: false });
    }
  },
}));