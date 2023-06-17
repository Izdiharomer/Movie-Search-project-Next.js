export async function searchMovies(searchMovie) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=9963a80d`);
      const data = await response.json();
      return data.Search || [];
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  }
  