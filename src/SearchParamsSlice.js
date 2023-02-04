import { createSlice } from "@reduxjs/toolkit";

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "",
    },
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    }, //, updateLocation: for just setting the location, breed: for just setting the breed, & animal.
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
