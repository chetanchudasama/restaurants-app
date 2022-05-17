import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    from: null,
    storieData: [{}],
    isOpen: false
};

const storieSlice = createSlice({
    name: "Storie",
    initialState,
    reducers: {
        setStoryData(state, action) {
            state.isOpen = true;
            state.from = action.payload.from;
            state.storieData = action.payload.storieData;
            return state;
        },
        setStorieFalse(state) {
            state.isOpen = false;
            state.from = null;
            state.storieData = [];
            return state;
        },
    },
});

export const storieAction = storieSlice.actions;

export default storieSlice;
