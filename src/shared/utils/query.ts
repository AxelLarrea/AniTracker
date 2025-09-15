
const searchByName = `
  query ($search: String, $page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        perPage
      }
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
      }
    }
  }
`;


const query = `
  query ($search: String) {
    Page {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
      }
    }
    Media (search: $search, type: ANIME) {
      episodes
      status
      coverImage {
        large
        medium
        extraLarge
        color
      }
      title {
        romaji
        native
        english
      }
      genres
    }
  }
`;