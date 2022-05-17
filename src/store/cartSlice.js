import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  menuCartData: [],
  error: false,
  isLoading: false,
  totalCost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.isLoading = action.payload.isLoading;
      state.cartData = action.payload.cartData;
      return state;
    },
    setMenuCart(state, action) {
      state.isLoading = action.payload.isLoading;
      state.menuCartData = action.payload.cartData;

      if(state.menuCartData.length > 0){
        let totalCost = 0;
        state.menuCartData.forEach((cart) => {
          totalCost = totalCost + cart.dealPrice;
        });
        state.totalCost = totalCost;  
      }
      return state;
    },
    addCartData(state, action) {
      return {
        ...state,
        cartData: [...state.cartData, action.payload.cartData],
        menuCartData: [...state.menuCartData, action.payload.cartPayload],
        isLoading: action.payload.isLoading,
        totalCost: state.totalCost + action.payload.cartPayload.dealPrice,
      };
    },
    removeCardData(state, action) {
      let dealPrice = 0;
      state.isLoading = action.payload.isLoading;
      state.cartData.forEach((cart, index) => {
        if (cart._id === action.payload.dishId) {
          state.cartData.splice(index, 1);
        }
      });
      state.menuCartData.forEach((cart, index) => {
        if (cart.dishId === action.payload.dishId) {
          state.menuCartData.splice(index, 1);
          dealPrice = cart.dealPrice;
        }
      });
      state.totalCost = state.totalCost - dealPrice;
      return state;
    },
    emptyCartData(state, action) {
      state.isLoading = action.payload.isLoading;
      state.cartData = [];
      state.totalCost = 0;
      return state;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
      state.cartData = [];
      return state;
    },
    setTotalCost(state, action) {
      state.totalCost = state.totalCost + action.payload.dealPrice;
      state.cartData.forEach((cart) => {
        console.log(cart);
        if (cart._id == action.payload.dishId) {
          cart.dealPrice = action.payload.dealPrice;
        }
      });
      return state;
    },
    calculateTotalCost(state) {
      let totalCost;
      state.cartData.forEach((cart) => {
        totalCost = state.totalCost + cart.dealPrice;
      });
      state.totalCost = totalCost;
      return state;
    },
    removeDishCost(state, action) {
      state.totalCost = state.totalCost - action.payload.dealPrice;
      return state;
    },
    resetTotalCost(state, action) {
      state.totalCost = 0;
      return state;
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
