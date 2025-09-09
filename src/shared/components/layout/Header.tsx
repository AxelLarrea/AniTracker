import { useAuth } from "@/features/auth/hooks/useAuth";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import ProfileDropdown from "../ui/ProfileDropdown";

const Header = () => {

  const [,navigate] = useLocation();
  const { user, initialize, cleanup, logout } = useAuth();

  useEffect(() => {
    initialize()

    return () => cleanup()
  }, [initialize, cleanup]);

  return (
    <header className="bg-primary p-6">
      <div className="max-w-[1200px] flex justify-between items-center mx-auto">
        <a href="/">
          <span className="text-3xl font-bold">
            <span className="text-accent">Ani</span>
            Tracker
          </span>
        </a>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Busca un anime..."
              className="h-8 bg-secondary outline-0 rounded-s-md py-1 px-2"
            />
            <button 
              type="submit" 
              className="h-8 bg-secondary cursor-pointer rounded-e-md pr-2"
            >
              <SearchIcon size={20} />
            </button>
          </div>


          { !user &&
            <div className="font-medium flex items-center gap-2">
              <button
                className="h-10 flex items-center gap-2 rounded-md cursor-pointer py-1 px-2"
                onClick={() => navigate("/login")}
                >
                Iniciar sesión
              </button>

              <button
                className="h-10 flex items-center gap-2 rounded-md cursor-pointer border-2 border-accent py-1 px-2"
                onClick={() => navigate("/signup")}
                >
                Registrarse
              </button>
            </div>
          }

          { user &&
            <div className="group flex relative">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <img 
                  className="w-10 h-10 rounded-full"
                  src={user.user_metadata.avatar_url} 
                  alt={user?.user_metadata.display_name}
                  width={40}
                  height={40}
                />
              </div>
              <p>{user.user_metadata.display_name}</p>

              {/* Dropdown */}
              <ProfileDropdown 
                navigate={navigate} 
                logout={logout} 
              />
            </div>
          }
        </div>
      </div>
    </header>
  );
}
 
export default Header;