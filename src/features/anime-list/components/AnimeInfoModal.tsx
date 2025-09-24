interface ModalProps {
  title: string,
  description: string,
  genres: string[],
  episodes: number,
  studio: {
    isAnimationStudio: boolean,
    name: string
  }
}

const AnimeInfoModal = ({ title, description, genres, episodes, studio }: ModalProps ) => {
  return (
    <section className="w-[275px] h-[225px] absolute left-full hidden bg-primary group-hover:flex flex-col justify-between gap-2 rounded-md p-4 ml-4">
      <p className="font-semibold text-neutral text-center line-clamp-2">{title}</p>
      <div className="font-medium flex justify-between">
        { studio && <p className="text-accent">{studio?.name}</p> }
        { episodes && <p>Episodios: {episodes}</p> }
      </div>
      <p className="text-neutral-dark text-sm line-clamp-3">{description}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {
          genres.slice(0, 3).map((genre) => (
            <span 
              key={genre} 
              className={`bg-accent text-white text-sm text-center rounded-lg px-2 py-0.5`}
            >
              {genre}
            </span>
          ))
        }
      </div>
    </section>
  );
}
 
export default AnimeInfoModal;