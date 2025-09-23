import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import AnimeCard from "@/features/anime-list/components/AnimeCard";
import type { AnimeCardProps } from "@/features/anime-list/types/animeList.types";

const AnimeListPage = () => {
  const { query: queryParams } = useParams()
  // Query para buscar por nombre
  const query = `
    query ($search: String, $mediaGenreNotIn2: [String], $page: Int, $perPage: Int) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
          perPage
        }
        media(search: $search, genre_not_in: $mediaGenreNotIn2, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            color
            extraLarge
            large
            medium
          }
          genres
          format
        }
      }
    }
  `;

  // Valor de las variables de la query
  const variables = {
    search: queryParams, // Busqueda
    mediaGenreNotIn2: "Hentai" // Excluir géneros
  };

  // Configuración de la petición
  const url = 'https://graphql.anilist.co'
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query: query,
          variables: variables
      })
  };

  // Realizar la petición
  const fetchData = async () => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['animes', queryParams],
    queryFn: fetchData,
  })

  
  const animes = data?.data?.Page?.media

  // console.log(data)
  // console.log(animes)
  
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {
        animes.map((anime: AnimeCardProps) => (
          <AnimeCard 
            key={anime.id} 
            id={anime.id} 
            title={anime.title} 
            coverImage={anime.coverImage} 
            format={anime.format} 
          />
        ))
      }
    </div>
  );
}
 
export default AnimeListPage;