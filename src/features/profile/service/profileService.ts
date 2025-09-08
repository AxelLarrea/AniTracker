import { supabasePublic } from "@/shared/services/supabase";

class ProfileService {
  // Obtener perfil del usuario
  async getUserProfile() {
    const { data: { user }, error } = await supabasePublic.auth.getUser();
    if (error) throw error;
    return user;
  }

  // Eliminar perfil
  async deleteProfile(id: string) {
    const baseUrl = import.meta.env.VITE_DEV_API_URL || ''
    const response = await fetch(`${baseUrl}/api/deleteUser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) throw new Error('Error al eliminar el perfil')

    return response
  }
}

export default new ProfileService();