import { createSlice } from "@reduxjs/toolkit";

const setUserToLocalStorage = (user) => {
  localStorage.setItem("@user", JSON.stringify(user));
};

const getUserToLocalStorage = (field) => {
  return JSON.parse(localStorage.getItem("@user") || "{}")[field] || "";
};

const setToLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

const getFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

const initialState = {
  loggedIn: getUserToLocalStorage("loggedIn") || false,
  error: false,
  user: {
    userid: getUserToLocalStorage("userid"),
    username: getUserToLocalStorage("username"),
    phonenumber: getUserToLocalStorage("phonenumber"),
    menuOpens: getUserToLocalStorage("menuOpens"),
    menuIdsOpened: getUserToLocalStorage("menuIdsOpened"),
    dishPriceChecked: getUserToLocalStorage("dishPriceChecked"),
    dishIdsChecked: getUserToLocalStorage("dishIdsChecked"),
    email: getUserToLocalStorage("email"),
    area: getUserToLocalStorage("area"),
    booking: getUserToLocalStorage("booking"),
    referral: getUserToLocalStorage("referral"),
    referralCode: getUserToLocalStorage("referralCode"),
    maxDishes: getUserToLocalStorage("maxDishes"),
    maxChefs: getUserToLocalStorage("maxChefs"),
    maxDishPrices: getUserToLocalStorage("maxDishPrices"),
    totalDishesBooked: getUserToLocalStorage("totalDishesBooked"),
    freeDishes: getUserToLocalStorage("freeDishes"),
    address: getUserToLocalStorage("address"),
  },
  getName: false,
  getReferral: false,
  freeMenuOpens: getFromLocalStorage("freeMenuOpens") || 0,
  freeMenuidsOpened: getFromLocalStorage("freeMenuidsOpened") || [],
  waitListSuccess: false,
  tourState : getFromLocalStorage("tourCompleted") || false,
};

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      setUserToLocalStorage({ ...action.payload.userData, loggedIn: true });
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.userData;
      return state;
    },
    setGetName(state, action) {
      setUserToLocalStorage({ ...action.payload.userData, loggedIn: true });
      state.getName = true;
      state.user = action.payload.userData;
      return state;
    },
    setGetReferral(state) {
      state.getReferral = true;
      return state;
    },
    setName(state, action) {
      state.user.username = action.payload.name;
      setUserToLocalStorage({ ...state.user, loggedIn: true });
    },
    setReferral(state, action) {
      state.user.referral = action.payload.referral;
      setUserToLocalStorage({ ...state.user, loggedIn: true });
    },
    setBooking(state, action) {
      state.user.booking = action.payload.booking;
      setUserToLocalStorage({ ...state.user, loggedIn: true });
    },
    setBookingDetails(state, action) {
      state.user.booking = action.payload.booking;
      state.user.totalDishesBooked = state.user.totalDishesBooked + action.payload.dishesBooked;
      state.user.email = action.payload.email;
      state.user.address = action.payload.address;
      setUserToLocalStorage({ ...state.user, loggedIn: true });
    },
    setLoginError(state, action) {
      state.error = action.payload.error;
      state.loggedIn = action.payload.loggedIn;
      return state;
    },
    incrementFreeMenuOpens(state, action) {
      state.freeMenuOpens = state.freeMenuOpens + 1;
      setToLocalStorage("freeMenuOpens", state.freeMenuOpens);
    },
    setFreeMenuId(state, action) {
      state.freeMenuidsOpened.push(action.payload.menuId);
      setToLocalStorage("freeMenuidsOpened", state.freeMenuidsOpened);
    },
    setTotalDishesBooked(state, action) {
      state.user.totalDishesBooked = state.user.totalDishesBooked + action.payload;
      setUserToLocalStorage({ ...state.user, loggedIn: true });
    },
    openFreeMenu(state, action) {
      state.freeMenuOpens = state.freeMenuOpens + 1;
      state.freeMenuidsOpened.push(action.payload);
      setToLocalStorage("freeMenuOpens", state.freeMenuOpens);
      setToLocalStorage("freeMenuidsOpened", state.freeMenuidsOpened);
    },
    setMenuOpenDetails(state, action) {
      state.user.menuOpens = action.payload.menuOpens;
      state.user.menuIdsOpened = action.payload.menuIdsOpened;
      setUserToLocalStorage({...state.user});
    },
    setDishPriceCheckedDetails(state, action) {
      state.user.dishPriceChecked = action.payload.dishPriceChecked;
      state.user.dishIdsChecked = action.payload.dishIdsChecked;
      setUserToLocalStorage({...state.user});
    },
    setWaitListSuccess(state){
      state.waitListSuccess = true;
    },
    setTourState(state){
      state.tourState = true;
      setToLocalStorage("tourCompleted", true);
    }
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
