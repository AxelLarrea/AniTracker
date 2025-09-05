import { supabasePublic, supabaseAdmin } from "@/shared/services/supabase";


class ProfileService {
  // Obtener perfil del usuario
  async getUserProfile() {
    const { data: { user }, error } = await supabasePublic.auth.getUser();
    if (error) throw error;
    return user;
  }

  // TODO: Mover esta función a la carpeta /api para usar ahí el cliente de admin
  // Eliminar perfil
  async deleteProfile(id: string) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) throw error;
    return { message: 'Profile deleted successfully' };
  }

}

export default new ProfileService();