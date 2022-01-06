import axiod from "https://deno.land/x/axiod/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {  MovieDetailsResponse,  MovieImagesResponse,  MovieListResponse } from "./types.ts";

declare const IMDB_API_KEY: string;
declare const MOVIE_YEAR: number;

const imdbUrl = 'https://movies-tvshows-data-imdb.p.rapidapi.com/';

export const fetchMovieList = (page: number) => fetchFromIMDB<MovieListResponse>({type: 'get-movies-byyear', page, year: MOVIE_YEAR});

export const fetchMovieDetailsById = (imdb: string) => fetchFromIMDB<MovieDetailsResponse>({type: 'get-movie-details', imdb });

export const fetchMovieImagesById = (imdb: string) => fetchFromIMDB<MovieImagesResponse>({ type: 'get-movies-images-by-imdb', imdb });

const fetchFromIMDB = async <T>(params: Record<string, string | number>): Promise<T> => {
  const apiKey = IMDB_API_KEY ?? config().IMDB_API_KEY;

  const res = await axiod.get(
    imdbUrl, 
    {
      params, 
      headers: { 
        'x-rapidapi-key': apiKey }
      }
  );

  return res.data;
}