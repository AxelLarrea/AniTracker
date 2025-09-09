import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isLoading: store.isLoading,
    initialize: store.initialize,
    cleanup: store.cleanup,
    login: store.login,
    logout: store.logout,
    signUp: store.signUp
  };
}