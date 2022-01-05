import fetchMovies from './mod.ts';
import { assertEquals, assertExists } from "https://deno.land/std@0.114.0/testing/asserts.ts";

declare global {
  // deno-lint-ignore no-var
  var IMDB_API_KEY: string;
}

globalThis.IMDB_API_KEY = '';

Deno.test("fetchMovies", async () => {
  const nextPageToken = { pageToken: '' };
  const movies = [];

  do {
    const responseString = await fetchMovies(JSON.stringify(nextPageToken));
    const responseObj = JSON.parse(responseString);

    const movie = responseObj.data;

    console.log("Movie Details: " + JSON.stringify(movie));
    console.log("Next Page Token: " + responseObj.nextPageToken);

    // assert that response contains details from Get Movie Details and Get Movie Images APIs
    assertExists(movie);
    assertExists(movie.imdb_id);
    assertExists(movie.title);
    assertExists(movie.poster);

    movies.push(movie);

    nextPageToken.pageToken = responseObj.nextPageToken;

  } while (JSON.parse(nextPageToken.pageToken).nextPage === 2);

  // assert the 20 movies from first page were fetched along with 1st movie from page 2
  assertEquals(21, movies.length);
})
