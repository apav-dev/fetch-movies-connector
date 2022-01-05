// deno-lint-ignore-file camelcase

export type State = {
  nextPage: number;
  movieList: Movie[];
  movieIndex: number;
};

export type IMDBApiResponse = {
  status: string;
  status_message: string;
}

export type Movie = {
  imdb_id: string;
  title: string;
  year?: string;
}

export type MovieListResponse = IMDBApiResponse & {
  results: number;
  Total_results: number;
  movie_results?: Movie[];
} 

export type MovieResponse = IMDBApiResponse & Movie;

export type MovieImages = {
  poster: string;
  fanart: string;
}

export type MovieImagesResponse = IMDBApiResponse & MovieImages;

export type MovieDetails = {
  description: string;
  tagline: string;
  release_date: string;
  imdb_rating: string;
  vote_count: string;
  popularity: string;
  youtube_trailer_key: string;
  rated: string;
  runtime: number;
  genres: string[];
  stars: string[];
  directors: string[];
  countries: string[];
  language: string[];
};

export type MovieDetailsResponse = IMDBApiResponse & Movie & MovieDetails;

export type MovieEntity = IMDBApiResponse & Movie & MovieImages & MovieDetails;