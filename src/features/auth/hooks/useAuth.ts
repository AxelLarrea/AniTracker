import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    profile: store.profile,
    isLoading: store.isLoading,
    login: store.login,
    logout: store.logout,
    signUp: store.signUp
  };
}