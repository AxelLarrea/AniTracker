import type { User } from "@supabase/supabase-js"

export interface loginProps {
  email: string,
  password: string,
}

export interface signupProps {
  email: string,
  password: string,
  display_name?: string
}

export interface authStoreProps {
  user: User | null,
  isLoading: boolean,
  authUnsubscribe: null | (() => void),
  
  // Funciones
  initialize: () => void,
  cleanup: () => void,
  login: (data: loginProps) => void,
  logout: () => void,
  signUp: (data: signupProps) => void
}