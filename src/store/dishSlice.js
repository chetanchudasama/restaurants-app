import { createSlice } from "@reduxjs/toolkit";

const initialState = { dishBand: {}, dishBandLoaded: false, currentPrice: 0 };

const dishSlice = createSlice({
  name: "Dish",
  initialState,
  reducers: {
    replaceDishBand(state, action) {
      state.dishBand = action.payload.dishBand;
      state.dishBandLoaded = true;
    },
    updatePrice(state, action) {
      state.currentPrice = action.payload;
    },
  },
});

export const dishActions = dishSlice.actions;

export default dishSlice;
