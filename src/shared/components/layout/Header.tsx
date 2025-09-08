import { SearchIcon, UserIcon } from "lucide-react";
import { useLocation } from "wouter";

const Header = () => {

  const [,navigate] = useLocation();

  return (
    <header className="bg-primary p-6">
      <div className="max-w-[1200px] flex justify-between items-center mx-auto">
        <a href="/">
          {/* <img src="#" alt="AniTracker Logo" className="size-10" /> */}
          <span className="text-3xl font-bold">
            <span className="text-accent">Ani</span>
            Tracker
          </span>
        </a>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for an anime..."
              className="h-8 bg-secondary outline-0 rounded-s-md py-1 px-2"
            />
            <button 
              type="submit" 
              className="h-8 bg-secondary cursor-pointer rounded-e-md pr-2"
            >
              <SearchIcon size={20} />
            </button>
          </div>

          <div>
            <button
              className="h-8 flex items-center gap-2 rounded-md cursor-pointer border border-secondary py-1 px-2"
              onClick={() => navigate("/auth")}
              >
              <UserIcon size={20} color="#4d85fb"/>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
 
export default Header;