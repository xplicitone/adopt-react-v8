import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import searchParams from "./SearchParamsSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
  },
});

export default store;
