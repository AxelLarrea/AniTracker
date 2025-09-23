import { useLocation } from "wouter";
import type { AnimeCardProps } from "../types/animeList.types";

interface format {
  [key: string]: string,
}

const formats: format = {
  TV: "Anime",
  MOVIE: "Película",
  SPECIAL: "Especial",
  OVA: "OVA",
  ONA: "ONA",
  MUSIC: "Música",
}

const bgColors: format = {
  TV: "bg-accent",
  MOVIE: "bg-red-500"
}

const AnimeCard = ({ id, title, coverImage, format }: AnimeCardProps) => {
  const [,navigate] = useLocation();
  const cardClass = bgColors[format] ? bgColors[format] : "bg-orange-500"

  // TODO: Eliminar el translate del hover y agregarle un modal con la info del anime

  return (
    <div 
      className="w-[200px] flex flex-col gap-2 hover:-translate-y-1 cursor-pointer transition"
      onClick={() => navigate(`/anime/${id}`)}
    >
      <div className="relative">
        <img
          className="w-[200px] h-[250px] object-cover rounded-md"
          src={coverImage.large} 
          alt={title.romaji}
        />
      
        <div 
          className="
            absolute bottom-0 left-0 bg-background rounded-tr-md pt-2 pr-2
            before:absolute before:bottom-full before:left-0 before:bg-background before:size-2 before:mask-[url(/curved-border.svg)] before:mask-no-repeat
            after:absolute after:bottom-0 after:left-full after:bg-background after:size-2 after:mask-[url(/curved-border.svg)] after:mask-no-repeat"
        >
          <p className={`${cardClass} text-white text-sm px-2 py-0.5 rounded-sm`}>
            {formats[format]}
          </p>
        </div>
      </div>
      
      <div>
        <p className="font-semibold text-center">{title.romaji}</p>
      </div>
    </div>
  );
}
 
export default AnimeCard;