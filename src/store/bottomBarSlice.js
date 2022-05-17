import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chef: true,
  dishes: false,
  cart: false,
  account: false,
  profile: false,
  storie: false,
  underconstruction: false,
  dishclick: false,
  checkout: false,
  benefits: false,
  dishBook: false,
  isEditUserDetail: false,
  bottombardisplay : true,
};

const bottomBarSlice = createSlice({
  name: "bottomBar",
  initialState,
  reducers: {
    loadTab(state, action) {
      switch (action.payload.tabName) {
        case "chef":
          state.chef = true;
          state.dishes = false;
          state.cart = false;
          state.profile = false;
          state.account = false;
          state.storie = false;
          state.dishclick = false;
          state.checkout = false;
          state.benefits = false;
          state.dishBook = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
        case "dishes":
          state.dishes = true;
          state.chef = false;
          state.cart = false;
          state.storie = false;
          state.profile = false;
          state.account = false;
          state.dishclick = true;
          state.checkout = false;
          state.benefits = false;
          state.dishBook = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
        case "cart":
          state.cart = true;
          state.chef = false;
          state.dishes = false;
          state.profile = false;
          state.storie = false;
          state.account = false;
          state.dishclick = false;
          state.checkout = false;
          state.benefits = false;
          state.dishBook = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
        case "checkout":
          state.checkout = true;
          state.cart = false;
          state.chef = false;
          state.dishes = false;
          state.profile = false;
          state.storie = false;
          state.account = false;
          state.dishclick = false;
          state.benefits = false;
          state.dishBook = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
        case "account":
          state.account = true;
          state.chef = false;
          state.dishes = false;
          state.cart = false;
          state.profile = false;
          state.storie = false;
          state.dishclick = false;
          state.checkout = false;
          state.benefits = false;
          state.dishBook = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
        case "benefits":
          state.account = false;
          state.benefits = true;
          state.chef = false;
          state.dishes = false;
          state.cart = false;
          state.profile = false;
          state.storie = false;
          state.dishclick = false;
          state.checkout = false;
          state.dishBook = false;
          state.isEditUserDetail = false;
          break;
        case "profile":
          state.profile = true;
          state.chef = false;
          state.storie = false;
          state.dishes = false;
          state.cart = false;
          state.account = false;
          state.dishclick = false;
          state.checkout = false;
          state.benefits = false;
          state.dishBook = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
        case "storie":
          state.storie = true;
          state.account = false;
          state.profile = false;
          state.checkout = false;
          state.benefits = false;
          state.dishBook = false;
          state.dishes = false;
          state.cart = false;
          state.dishclick = false;
          state.chef = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
        case "dishBook":
          state.dishBook = true;
          state.cart = false;
          state.chef = false;
          state.dishes = false;
          state.profile = false;
          state.storie = false;
          state.account = false;
          state.dishclick = false;
          state.checkout = false;
          state.benefits = false;
          state.isEditUserDetail = false;
          state.bottombardisplay = true;
          break;
          case "editUser": 
          state.isEditUserDetail = true;
          state.dishBook = false;
          state.cart = false;
          state.chef = false;
          state.dishes = false;
          state.profile = false;
          state.storie = false;
          state.account = false;
          state.dishclick = false;
          state.checkout = false;
          state.benefits = false;
          state.bottombardisplay = true;
          break
        default:
          break;
      }
    },
    changeBottombar(state, action) {
      state.bottombardisplay = action.payload.bottombardisplay
      return state
    },
    hideCart(state, action){
      state.cart = false;
      return state;
    },
    showCart(state, action){
      state.cart = true;
      return state;
    }
  },
});

export const bottomBarActions = bottomBarSlice.actions;

export default bottomBarSlice;
