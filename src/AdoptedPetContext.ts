import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

// if you have a cart, of items, put an empty array [] in createContext
// ts make you have a default value
const AdoptedPetContext = createContext<[Pet, (adoptedPet: Pet) => void]>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    description: "Lorem Ipsum",
    breed: "Beagle",
    images: [],
    city: "Omaha",
    state: "NE",
  },
  () => {},
]);

export default AdoptedPetContext;
