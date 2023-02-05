import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetPetQuery } from "./petApiService";
import { adopt } from "./adoptedPetSlice";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";

import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const { isLoading, data: pet } = useGetPetQuery(id);
  const dispatch = useDispatch();

  // not being defense here (yet??)
  /*if (results.isError) {
    return <h2>ohno</h2>;
  }*/

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🍥</h2>
      </div>
    );
  }

  // Once here, pet is available and pet is loaded
  //const pet = results.data.pets[0];

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
