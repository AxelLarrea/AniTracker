import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

interface Props {
  navigate: (path: string) => void;
  logout: () => void;
}

const ProfileDropdown = ({ navigate, logout }: Props) => {
  return (
    <div className="hidden w-36 absolute top-14 z-1 group-hover:flex flex-col before:absolute before:bottom-full before:w-36 before:h-10">
      <section className="w-full font-medium bg-secondary flex flex-col gap-2 rounded-t-md p-4">
        <button 
          className="flex items-center gap-2 text-sm text-slate-100 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <UserIcon size={15} strokeWidth={3} color="#4d85fb"/>
          Perfil
        </button>
        
        <button 
          className="flex items-center gap-2 text-sm text-start text-slate-100 cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon size={15} strokeWidth={3} color="#4d85fb"/>
          Ajustes
        </button>
      </section>

      <section className="w-full font-medium bg-primary flex flex-col gap-2 rounded-b-md p-4">
        <button 
          className="flex items-center gap-2 text-sm text-start text-slate-100 cursor-pointer"
          onClick={logout}
        >
          <LogOutIcon size={15} strokeWidth={3} color="#4d85fb"/>
          Cerrar Sesión
        </button>
      </section>
    </div>
  );
}
 
export default ProfileDropdown;