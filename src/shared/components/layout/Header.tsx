import { SearchIcon, UserIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary p-4">
      <div className="max-w-[1200px] flex justify-between items-center mx-auto">
        <a href="/">
          <img src="#" alt="AniTracker Logo" className="size-10" />
        </a>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for an anime..."
              className="bg-amber-100 text-slate-700 outline-0 ::placeholder:text-slate-700 rounded-lg py-1 px-2"
            />
            <button type="submit" className="cursor-pointer">
              <SearchIcon size={20} />
            </button>
          </div>

          <button className="flex items-center gap-2 rounded-lg cursor-pointer border border-amber-100 py-1 px-2">
            Login
            <UserIcon size={30} />
          </button>
        </div>
      </div>
    </header>
  );
}
 
export default Header;