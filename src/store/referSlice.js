import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShownRefer: false,
  from: "chef",
};

const referSlice = createSlice({
  name: "refer",
  initialState,
  reducers: {
    onReferClick(state, action) {
      state.isShownRefer = true;
      state.from = action.payload.from;
      return state;
    },
    onBackClick(state) {
      state.isShownRefer = false;
      return state;
    },
  },
});

export const referActions = referSlice.actions;

export default referSlice;
