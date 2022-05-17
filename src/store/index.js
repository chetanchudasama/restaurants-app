import { configureStore } from "@reduxjs/toolkit";
import bottomBarSlice from "./bottomBarSlice";
import chefSlice from "./chefSlice";
import menuSlice from "./menuSlice";
import loginSlice from "./loginSlice";
import cartSlice from "./cartSlice";
import storieSlice from "./storieSlice";
import underconstructionSlice from "./underconstructionslice";
import dishSlice from "./dishSlice";
import referSlice from "./referSlice";

const store = configureStore({
  reducer: {
    chef: chefSlice.reducer,
    menu: menuSlice.reducer,
    bottomBar: bottomBarSlice.reducer,
    auth: loginSlice.reducer,
    cart: cartSlice.reducer,
    storie: storieSlice.reducer,
    underconstruction: underconstructionSlice.reducer,
    dish: dishSlice.reducer,
    refer: referSlice.reducer, 
  },
});

export default store;
