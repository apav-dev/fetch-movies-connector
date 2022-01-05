import axiod from "https://deno.land/x/axiod/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {  MovieDetailsResponse,  MovieImagesResponse,  MovieListResponse } from "./types.ts";

const imdbUrl = 'https://movies-tvshows-data-imdb.p.rapidapi.com/';

export const fetchMovieList = (page: number, apiKey?: string) => fetchFromIMDB<MovieListResponse>({type: 'get-movies-byyear', page, year: 1999}, apiKey);

export const fetchMovieDetailsById = (imdb: string, apiKey?: string) => fetchFromIMDB<MovieDetailsResponse>({type: 'get-movie-details', imdb }, apiKey);

export const fetchMovieImagesById = (imdb: string, apiKey?: string) => fetchFromIMDB<MovieImagesResponse>({ type: 'get-movies-images-by-imdb', imdb }, apiKey);

const fetchFromIMDB = async <T>(params: Record<string, string | number>, apiKey?: string): Promise<T> => {
  if(!apiKey){
    apiKey = config().IMDB_API_KEY;
  }

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