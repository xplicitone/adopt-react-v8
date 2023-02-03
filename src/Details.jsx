import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
  const dispatch = useDispatch();

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

  // rending Modal inside this React app, using setShowModal and pet.name, using all state inside of this to render somewhere else.
  // much harder to do this without a portal - would pull all pet state out to app.jsx to be able to handle that otherwise which would be really hard.
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      dispatch(adopt(pet));
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

// If Details decides to have props in the future, it needs to passthru here. Spread operator OK because DetailsErrorBoundary doesnt care about props and meant to be seamless
// dont care, go directly through DetailsErrorBoundary and pass it.. Not meant to have an opinion about the props.
function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary
      errorComponent={
        <h2>
          There was an error with this listing.
          <Link to="/">Click here to go back to the home page</Link>
        </h2>
      }
    >
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
