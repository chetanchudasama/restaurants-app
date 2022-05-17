import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  underconstruction:false
};

const underconstructionSlice = createSlice({
  name: "underconstruction",
  initialState,
  reducers: {
    onSearchClick(state, action) {
      state.menuClicked = false;
      state.underconstruction = true;
    },
    onBackClick(state) {
      state.underconstruction = false;
    },

  },
});

export const underconstructionActions = underconstructionSlice.actions;

export default underconstructionSlice;
