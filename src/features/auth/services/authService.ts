import { supabasePublic } from "@/shared/services/supabase";
import type { authProps } from "../types/auth.types";

class AuthService {
  // Iniciar sesión
  async login({ email, password }: authProps) {
    const { data, error } = await supabasePublic.auth.signInWithPassword({ email, password });
    
    if (error) throw error
    return data
  }

  // Cerrar sesión
  async logout() {
    const { error } = await supabasePublic.auth.signOut();
    
    if (error) throw error
    return { message: 'Logged out successfully' }
  }

  // Registrarse
  async signUp({ email, password }: authProps) {
    const { data, error } = await supabasePublic.auth.signUp({ email, password });
    
    if (error) throw error
    return data
  }

}

export default new AuthService();