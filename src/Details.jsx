import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  // "details" is any arbitrary caching key, like what you provide to Redis or MemCacheD
  // basically says store it "here" in your cache.
  // So it knows if you go and fetch exact same key again, it's not going to go fetch that
  // from the API again. You'll get exact same response. (cache time Infinity)
  // if you don't have details id in your cache, run this (fetchPet) and
  // ["details", id] will be passed as the queryKey to fetchPet
  // no await, cannot await in a render function
  /* how cool si this: get to treat it like a sync hook but fetch from async api
  and then just have to do bifurcation of like if it's loading   do this else.
  (there's a bunch of other flags like isError, isLoadingError etc. or just look at status of text if 
  you want to do a switch statement or something like that. Also manually call refetch yourself. results.refetch() 
  if you think it's stale and you want to refetch) */
  // more readable than useEffect

  const results = useQuery(["details", id], fetchPet);

  // not being defense here (yet??)
  /*if (results.isError) {
    return <h2>ohno</h2>;
  }*/

  // isLoading for first load. isFetching for refetching.
  // short circuits here
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🍥</h2>
      </div>
    );
  }

  // Once here, pet is available and pet is loaded
  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

export default Details;
