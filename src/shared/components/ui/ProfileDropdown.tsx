import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

interface Props {
  navigate: (path: string) => void;
  logout: () => void;
}

const ProfileDropdown = ({ navigate, logout }: Props) => {
  return (
    <div className="hidden w-32 group-hover:flex flex-col absolute top-8 bg-secondary rounded-md">
      <section className="w-full flex flex-col gap-2 p-4">
        <button 
          className="flex items-center gap-2 text-sm text-slate-100 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <UserIcon size={15} color="#4d85fb"/>
          Profile
        </button>
        
        <button 
          className="flex items-center gap-2 text-sm text-start text-slate-100 cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <SettingsIcon size={15} color="#4d85fb"/>
          Settings
        </button>
      </section>

      <section className="w-full bg-primary flex flex-col gap-2 p-4">
        <button 
          className="flex items-center gap-2 text-sm text-start text-slate-100 cursor-pointer"
          onClick={logout}
        >
          <LogOutIcon size={15} color="#4d85fb"/>
          Logout
        </button>
      </section>
    </div>
  );
}
 
export default ProfileDropdown;