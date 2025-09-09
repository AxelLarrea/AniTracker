import { supabasePublic } from "@/shared/services/supabase";
import type { loginProps, signupProps } from "../types/auth.types";
import type { User } from "@supabase/supabase-js";

class AuthService {
  // Iniciar sesión
  async login({ email, password }: loginProps) {
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
  async signUp({ email, password, display_name }: signupProps) {
    const { data, error } = await supabasePublic.auth.signUp({ 
      email, 
      password, 
      options: { 
        data: { display_name } 
      }
    });
    
    if (error) throw error
    return data
  }

  // Obtener sesión
  async getSession() {
    const { data: { session }, error } = await supabasePublic.auth.getSession();
    
    if (error) throw error
    return session
  }

  // Obtener usuario
  async getUser() {
    const { data: { user }, error } = await supabasePublic.auth.getUser();

    if (error) throw error;
    return user;
  }

  // Escuchar cambios en la autenticación
  onAuthStateChange(callback: (user: User | null) => void) {
    const { data: { subscription }} = supabasePublic.auth.onAuthStateChange((_, session) => {
      callback(session?.user || null)
    });

    // Desuscribirse para limpiar recursos
    return () => subscription.unsubscribe(); 
  }

}

export default new AuthService();