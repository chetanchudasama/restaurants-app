import axios from "axios";
import { chefActions } from "./chefSlice";
import { API_LOCAL, API_TEST } from "./constants";

export const fetchChefList = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("chef");
      if (response.status != 200) {
        throw new Error("Could not fetch Chef list");
      }
      const data = response.data.data;
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(chefActions.replaceChefList({ chefList: data }));
    } catch (error) {
      console.log("error while calling chef-fetchdata");
      // show error on ui
    }
  };
};

export const fetchCategories = (chefId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("menu/chef/categories/" + chefId);
      if (response.status != 200) {
        throw new Error("Could not fetch Chef list");
      }
      const data = response.data.data;
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(
        chefActions.replaceCategories({
          categories: data.categories,
          chefId: chefId,
          id : data._id
        })
      );
    } catch (error) {
      console.log("error while calling categories-fetchdata");
      // show error on ui
    }
  };
};

