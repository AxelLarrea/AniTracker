export interface AnimeCardProps {
  id: number,
  title: {
    romaji: string,
    english: string,
    native: string
  },
  coverImage: {
    color: string,
    extraLarge: string,
    large: string,
    medium: string
  },
  format: string,
  description: string,
  genres: string[],
  episodes: number,
  studios: {
    nodes: {
      isAnimationStudio: boolean,
      name: string
    }[]
  }
}
