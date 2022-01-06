import { fetchMovieList, fetchMovieDetailsById, fetchMovieImagesById } from "./api.ts";
import { MovieDetailsResponse, MovieEntity, MovieImagesResponse, State } from "./types.ts";

const fetchMovies  = async (stateString: string): Promise<string> => {
  let state: State;
  
  const inputJson = JSON.parse(stateString);

  // Initiate state the first time the function is called
  if(!inputJson.pageToken){
    state = {
      nextPage: 1,
      movieList: [],
      movieIndex: 0,
    }
  } else {
    // Parse the page token string after the first run
    state = JSON.parse(inputJson.pageToken);
  }

  // If the movie index is 0, the next page of movies is fetched
  if (state.movieIndex === 0){
    const movieListResponse = await fetchMovieList(state.nextPage);

    // Assign the list of movies from the movie page to the movie list. 
    if(movieListResponse.movie_results){
      state.movieList = movieListResponse.movie_results;
      state.nextPage = state.nextPage + 1;
    } else {
      // If there are no movies on the page, terminate the run loop by not returning a nextPageToken
      return JSON.stringify({ data: {}})
    }
  }

  // Increment the movie index to get the next movie from the current list of movies
  // deno-lint-ignore camelcase
  const imdb_id = state.movieList[state.movieIndex].imdb_id;
  state.movieIndex = state.movieIndex += 1;
  // Reset the movie index to 0 after reaching the end of the list.
  if(state.movieIndex >= state.movieList.length){
    state.movieIndex = 0;
  }

  // Fetch the movie details and images by IMDB ID and return the combined result
  const movieDetailsResponse: MovieDetailsResponse = await fetchMovieDetailsById(imdb_id);
  const movieImagesResponse: MovieImagesResponse = await fetchMovieImagesById(imdb_id);
  const data: MovieEntity  = {...movieDetailsResponse, ...movieImagesResponse};

  // Return the data as an object and strigify the state as the nextPageToken.
  return JSON.stringify({data, nextPageToken: JSON.stringify(state)})
}

export default fetchMovies;
