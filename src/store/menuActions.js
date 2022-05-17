import axios from "axios";
import { API_TEST } from "./constants";
import { dishActions } from "./dishSlice";
import { menuActions } from "./menuSlice";
const qs = require("qs");

const HIDDEN_GEM = "HIDDEN_GEM";

export const fetchChefMenu = (chefId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(API_TEST + "menu/chef/" + chefId);
      if (response.status != 200) {
        throw new Error("Could not fetch Menu details");
      }
      const data = response.data.data;
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(menuActions.replaceMenuDetails({ menuDetails: data }));
    } catch {
      console.log();
      console.log("error while calling menu-fetchdata");
      // show error on ui
    }
  };
};

export const fetchDishBand = (dishId, setDishBand) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(API_TEST + "dishBand/" + dishId);
      if (response.status != 200) {
        throw new Error("Could not fetch Menu details");
      }
      if (response.data.data.type && response.data.data.type === "DEFAULT") {
        const data = {
          dishId: dishId,
          totalBookings: 0,
          band: HIDDEN_GEM,
          percentBookedInBand: 0,
        };
        if(setDishBand) setDishBand(data);
        return data;
      }
      const data = response.data.data;
      if(setDishBand) setDishBand(data);
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(dishActions.replaceDishBand({ dishBand: data }));
    } catch {
      console.log("error while calling dish bands");
      // show error on ui
    }
  };
};

export const fetchDishes = (menuIdsOpened) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(API_TEST + "menu/dishes/", {
        params: {
          menuIdsOpened: menuIdsOpened,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      if (response.status != 200) {
        throw new Error("Could not fetch Dishes");
      }
      if ((response.data.data.type && response.data.data.type == "DEFAULT")) return undefined;
      const data = response.data.data;
      return data;
    };

    try {
      const data = await fetchData();
      data
        ? dispatch(menuActions.replaceDishes({ dishes: data }))
        : dispatch(menuActions.setNoDishes());
    } catch {
      console.log();
      console.log("error while calling menu-fetchdata");
      // show error on ui
    }
  };
};
