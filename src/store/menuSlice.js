import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuDetails: {},
  menuLoaded: false,
  dishes: [],
  dishesLoaded: false,
  noDishes: false,
  numberOfMenus: 0,
};

const menuSlice = createSlice({
  name: "Menu",
  initialState,
  reducers: {
    replaceMenuDetails(state, action) {
      state.menuDetails = action.payload.menuDetails;
      state.menuLoaded = true;
      state.noDishes = false;
    },
    replaceDishes(state, action) {
      state.dishes = action.payload.dishes;
      state.dishesLoaded = true;
      state.noDishes = false;
      state.numberOfMenus++;
    },
    setNoDishes(state, action) {
      state.noDishes = true;
      state.dishesLoaded = true;
    },
  },
});

export const menuActions = menuSlice.actions;

export default menuSlice;
