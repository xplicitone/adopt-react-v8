import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

// if you have a cart, of items, put an empty array [] in createContext
// ts make you have a default value
// had to change that AdoptedPet can be Pet or null. Most of the time null when they haven't adopted yet
const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
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
