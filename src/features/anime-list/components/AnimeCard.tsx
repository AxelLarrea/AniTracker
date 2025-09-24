import { useLocation } from "wouter";
import type { AnimeCardProps } from "../types/animeList.types";
import AnimeInfoModal from "./AnimeInfoModal";

interface format {
  [key: string]: string,
}

const formats: format = {
  TV: "Anime",
  TV_SHORT: "ONA",
  MOVIE: "Película",
  MOVIE_SHORT: "Película",
  OVA: "OVA",
  ONA: "ONA",
  SPECIAL: "Especial",
  MUSIC: "Música",
}

// const bgColors: format = {
//   TV: "bg-accent",
//   MOVIE: "bg-red-500"
// }

const AnimeCard = ({ id, title, coverImage, format, description, genres, episodes, studios }: AnimeCardProps) => {
  const [,navigate] = useLocation();
  // const cardClass = bgColors[format] ? bgColors[format] : "bg-orange-500"
  const formattedDescription = description?.replace(/<br>/g, '\n') // Reemplazar las etiquetas de salto de línea por un salto de linea
  const cleanDescription = formattedDescription?.replace(/<[^>]*>/g, '') // Remover las etiquetas HTML del texto
  const filteredStudio = studios.nodes.filter((studio) => studio.isAnimationStudio)
  // TODO: Eliminar el translate del hover y agregarle un modal con la info del anime
  return (
    <div 
      className="group relative w-[220px] flex flex-col gap-2 hover:-translate-y-1 hover:z-1 cursor-pointer transition"
      onClick={() => navigate(`/anime/${id}`)}
    >
      {/* Modal en hover */}
      <AnimeInfoModal 
        title={title.romaji} 
        episodes={episodes} 
        studio={filteredStudio[0]} 
        description={cleanDescription} 
        genres={genres}
      />

      <section className="relative">
        <img
          className="w-full h-[275px] object-cover rounded-md"
          src={coverImage.large} 
          alt={title.romaji}
          width={220}
          height={275}
        />
      
        <div 
          className="
            absolute bottom-0 left-0 bg-background rounded-tr-md pt-2 pr-2
            before:absolute before:bottom-full before:left-0 before:bg-background before:size-2 before:mask-[url(/curved-border.svg)] before:mask-no-repeat
            after:absolute after:bottom-0 after:left-full after:bg-background after:size-2 after:mask-[url(/curved-border.svg)] after:mask-no-repeat"
        >
          <p className="bg-secondary font-medium text-neutral text-sm px-2 py-0.5 rounded-sm">
            {formats[format]}
          </p>
        </div>
      </section>
      
      <div>
        <p className="font-semibold line-clamp-2 group-hover:text-neutral">
          {title.romaji}
        </p>
      </div>
    </div>
  );
}
 
export default AnimeCard;