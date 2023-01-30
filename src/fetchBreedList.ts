import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListAPIResponse } from "./APIResponsesTypes";

// Probably create Factory that gens endpoints for you since essentially same as fetchPet.js
// usually wait awhile before trying to make an abstraction
// write it 3x and on the 4th time maybe think about it
// Abstraction is generally your enemy when it comes to the good maintainable code
const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal = queryKey[1];

  // if you get a request for blank, just return empty array
  // NO LONGER NEEDED. Demanding you always get an animal
  //if (!animal) return [];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`); // debugging purposes as is
  }

  return apiRes.json();
};

export default fetchBreedList;
