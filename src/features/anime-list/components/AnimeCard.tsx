import { useLocation } from "wouter";
import type { AnimeCardProps } from "../types/animeList.types";


const AnimeCard = ({ id, title, coverImage, format }: AnimeCardProps) => {
  const [,navigate] = useLocation();
  
  return (
    <div 
      className="w-[200px] flex flex-col gap-2"
      onClick={() => navigate(`/anime/${id}`)}
    >
      <img
        className="w-[200px] h-[300px] object-cover rounded-md"
        src={coverImage.large} 
        alt={title.romaji}
      />
      <div>
        <p className="font-bold text-center">{title.romaji}</p>
        <p>{format}</p>
      </div>
    </div>
  );
}
 
export default AnimeCard;