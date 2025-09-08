import type { User } from "@supabase/supabase-js"

export interface authProps {
  email: string,
  password: string,
  display_name?: string
}

export interface userProps {
  id: string,
  email: string,
  created_at: string,
  updated_at: string
}

export interface profileProps {
  username: string,
  display_name: string,
  avatar_url: string,
  bio: string
}

export interface authStoreProps {
  user: User | null,
  profile: object | null,
  isLoading: boolean,

  login: (data: authProps) => void,
  logout: () => void,
  signUp: (data: authProps) => void
}