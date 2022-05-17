import axios from "axios";
import { bottomBarActions } from "./bottomBarSlice";
import { cartAction } from "./cartSlice";
import { chefActions } from "./chefSlice";
import { MSG91_AUTH_KEY, MSG91_SMS_TEMPLATE_ID, MSG91_URL } from "./constants";
import { loginActions } from "./loginSlice";
import mixpanel from 'mixpanel-browser';

export const loginAction = (user, setError) => async (dispatch) => {
  try {
    const { data } = await axios.post("user", user);
    if (data.statusCode == 200) {
      const userData = {
        userid: data.data._id,
        username: data.data.name,
        phonenumber: data.data.phoneNumber,
        menuOpens: data.data.menuOpens,
        menuIdsOpened: data.data.menuIdsOpened,
        dishPriceChecked: data.data.dishPriceChecked,
        dishIdsChecked: data.data.dishIdsChecked,
        email: data.data.email,
        area: data.data.area,
        referral: data.data.referral,
        referralCode: data.data.referralCode,
        maxDishes: data.data.maxDishes,
        maxChefs: data.data.maxChefs,
        maxDishPrices: data.data.maxDishPrices,
        totalDishesBooked: data.data.totalDishesBooked,
        freeDishes: data.data.freeDishes,
      };
      if (data.data.statusCode == 405) {
        dispatch(loginActions.setGetReferral());
        setError(true);
      }else if (data.data.name) {
        dispatch(loginActions.setLoggedIn({ loggedIn: true, userData }));
        dispatch(bottomBarActions.loadTab({ tabName: "profile" }));
      } else {
        dispatch(loginActions.setGetName({ userData }));
      }
    } else if (data.statusCode == 400) {
      console.log("error");
      //TODO: show error page
    }
  } catch ({ ...error }) {
    dispatch(loginActions.setLoginError({ loggedIn: false, error }));
  }
};

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("user/login", user);
    if (data.statusCode == 200) {
      const userData = {
        userid: data.data._id,
        username: data.data.name,
        phonenumber: data.data.phoneNumber,
        menuOpens: data.data.menuOpens,
        menuIdsOpened: data.data.menuIdsOpened,
        dishPriceChecked: data.data.dishPriceChecked,
        dishIdsChecked: data.data.dishIdsChecked,
        email: data.data.email,
        area: data.data.area,
        referral: data.data.referral,
        referralCode: data.data.referralCode,
        maxDishes: data.data.maxDishes,
        maxChefs: data.data.maxChefs,
        maxDishPrices: data.data.maxDishPrices,
        totalDishesBooked: data.data.totalDishesBooked,
      };
      if (data.data.name) {
        dispatch(loginActions.setLoggedIn({ loggedIn: true, userData }));
        dispatch(bottomBarActions.loadTab({ tabName: "profile" }));
        mixpanel.track("login_successful");
      } else {
        dispatch(loginActions.setGetName({ userData }));
        mixpanel.track("login_successful-new_signup");
      }
    } else if (data.statusCode == 400) {
      console.log("error");
      //TO-DO: show error page
    }
  } catch ({ ...error }) {
    dispatch(loginActions.setLoginError({ loggedIn: false, error }));
  }
};

export const reloadUser = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("user/" + userId);
      if (response.status != 200) {
        throw new Error("Could not fetch User");
      }
      const data = response.data;
      const userData = {
        userid: data.data._id,
        username: data.data.name,
        phonenumber: data.data.phoneNumber,
        menuOpens: data.data.menuOpens,
        menuIdsOpened: data.data.menuIdsOpened,
        dishPriceChecked: data.data.dishPriceChecked,
        dishIdsChecked: data.data.dishIdsChecked,
        email: data.data.email,
        area: data.data.area,
        referral: data.data.referral,
        referralCode: data.data.referralCode,
        maxDishes: data.data.maxDishes,
        maxChefs: data.data.maxChefs,
        maxDishPrices: data.data.maxDishPrices,
        totalDishesBooked: data.data.totalDishesBooked,
        freeDishes: data.data.freeDishes,
      };
      return userData;
    };

    try {
      const userData = await fetchData();
      dispatch(loginActions.setLoggedIn({ loggedIn: true, userData }));
      if (!userData.username) {
        dispatch(loginActions.setGetName({ userData }));
      }
    } catch (error) {
      console.log("error while calling user-fetchdata");
      // show error on ui
    }
  };
};

export const setBookingData = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const { data } = await axios(`bookings/${userId}`);
      if (data.data) dispatch(loginActions.setBooking({ booking: data.data }));
    }
  } catch ({ ...error }) {
    console.log(error);
  }
};

export const addWaitingList = (phoneNumber) => async (dispatch) => {
  try {
    if (phoneNumber) {
      let user = {phoneNumber: phoneNumber};
      const { data } = await axios.post(`user/waiting`, user);
      dispatch(loginActions.setWaitListSuccess());
    }
  } catch ({ ...error }) {
    console.log(error);
  }
};

export const updateName = (user, name) => async (dispatch) => {
  try {
    const { data } = await axios.post("userName/" + user.userid, {
      name: name,
    });
    if (data.statusCode == 200) {
      dispatch(loginActions.setName({ name: name }));
      dispatch(bottomBarActions.loadTab({ tabName: "profile" }));
    } else if (data.statusCode == 400) {
      console.log("error");
      //TO-DO: show error page
    }
  } catch ({ ...error }) {
    dispatch(loginActions.setLoginError({ loggedIn: false, error }));
  }
};

export const updateReferral = (user, referral) => async (dispatch) => {
  try {
    const { data } = await axios.post("userReferral/" + user.userid, {
      referral: referral,
    });
    if (data.statusCode == 200) {
      dispatch(loginActions.setReferral({ referral: referral }));
      dispatch(bottomBarActions.loadTab({ tabName: "profile" }));
    } else if (data.statusCode == 400) {
      console.log("error");
      //TO-DO: show error page
    }
  } catch ({ ...error }) {
    dispatch(loginActions.setLoginError({ loggedIn: false, error }));
  }
};

export const checkoutUpdate = (cart, user, email, area) => async (dispatch) => {
  try {
    const { data } = await axios.post("checkout/update/" + user.userid, {
      cart: cart,
    });
    if (data && data.statusCode == 200) {
      dispatch(loginActions.setTotalDishesBooked(cart.length));
      //TODO: empty local cart
      dispatch(loginActions.setBooking({ booking: data.data }));
      dispatch(bottomBarActions.loadTab({ tabName: "dishBook" }));
    } else if (data && data.statusCode == 400) {
      console.log("error");
      //TO-DO: show error page
    }
  } catch ({ ...error }) {
    console.log(error);
    //TO-DO: show error page
  }
};

export const checkout = (cart, user, email, area, location) => async (dispatch) => {
  try {
    const { data } = await axios.post("checkout/" + user.userid, {
      email: email,
      area: area,
      cart: cart,
      location : location
    });
    if (data && data.statusCode == 200) {
      dispatch(
        loginActions.setBookingDetails({
          booking: data.data,
          email: email,
          area: area,
          dishesBooked: cart.length,
        })
      );
      dispatch(cartAction.emptyCartData({ isLoading: false }));
      dispatch(chefActions.onBackClick());
      dispatch(bottomBarActions.loadTab({ tabName: "dishBook" }));
      //TODO: empty local cart
    } else if (data && data.statusCode == 400) {
      console.log("error");
      //TO-DO: show error page
    }
  } catch ({ ...error }) {
    console.log(error);
    //TO-DO: show error page
  }
};

export const updateUser = (user, menuId) => async (dispatch) => {
  try {
    let menuIdsOpened = [];
    menuIdsOpened = menuIdsOpened.concat(user.menuIdsOpened);
    menuIdsOpened.push(menuId);
    let menuOpens = user.menuOpens;
    let userUpdates = {
      menuOpens: menuOpens + 1,
      menuIdsOpened: menuIdsOpened,
    };
    const { data } = await axios.post("user/" + user.userid, userUpdates);
    if (data.statusCode == 200) {
      dispatch(loginActions.setMenuOpenDetails(userUpdates));
    } else if (data.statusCode == 400) {
      console.log("error");
      //TO-DO: show error page
    }
  } catch ({ ...error }) {
    console.log(error);
    //TO-DO: show error page
  }
};

export const updateDishPrice =
  (
    cost,
    ingredientCost,
    dishBand,
    setCurrentPrice,
    calculateTotal,
    dishId,
    isRemovedDish,
    isFromCart
  ) =>
  async (dispatch) => {
    try {
      const priceData = await axios.get(
        "menu/dish/" + Number(cost) + "/" + ingredientCost + "/" + dishBand
      );
      if (priceData.status == 200) {
        const currentPrice = priceData.data.data;
        if (setCurrentPrice) setCurrentPrice(currentPrice);
        if (!isFromCart) return;
        if (calculateTotal) {
          dispatch(
            cartAction.setTotalCost({
              dealPrice: currentPrice,
              dishId: dishId,
            })
          );
        } else if (isRemovedDish) {
          dispatch(
            cartAction.removeDishCost({
              dealPrice: currentPrice,
              dishId: dishId,
            })
          );
        }
        return currentPrice;
        //dispatch(dishActions.updatePrice(priceData.data.data));
      } else if (priceData.status == 400) {
        console.log("error");
        //TO-DO: show error page
      }
    } catch (error) {
      console.log(error);
      //TO-DO: show error
    }
  };

export const updateDishCheckedInUser = (user, dishId) => async (dispatch) => {
  try {
    let dishIdsChecked = [];
    dishIdsChecked = dishIdsChecked.concat(user.dishIdsChecked);
    dishIdsChecked.push(dishId);
    let dishPriceChecked = dishIdsChecked.length;
    let userUpdates = {
      dishPriceChecked: dishPriceChecked,
      dishIdsChecked: dishIdsChecked,
    };
    const { data } = await axios.post("user/" + user.userid, userUpdates);
    if (data.statusCode == 200) {
      dispatch(loginActions.setDishPriceCheckedDetails(userUpdates));
    } else if (data.statusCode == 400) {
      console.log("error");
      //TO-DO: show error page
    }
  } catch ({ ...error }) {
    console.log(error);
    //TO-DO: show error page
  }
};

export const sendOTP =
  ({ mobileNumber, otp }) =>
  async (dispatch) => {
    try {
      const response = await axios({
        baseURL: MSG91_URL,
        url: "otp",
        params: {
          template_id: MSG91_SMS_TEMPLATE_ID,
          authkey: MSG91_AUTH_KEY,
          mobile: mobileNumber,
          otp,
        },
      });
      if (response.statusCode === 200) {
        // TODO: handle success response
        console.log(response);
      }
    } catch ({ ...error }) {
      // TODO: handle error response
      console.log(error);
    }
  };
