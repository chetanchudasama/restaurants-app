import axios from "axios";
import { cartAction } from "./cartSlice";

export const setCartData = (userId) => async (dispatch) => {
  try {
    if (userId) {
      //dispatch(cartAction.setIsLoading({ isLoading: true }));
      const { data } = await axios(`userCart/${userId}`);
      if (data.data)
        dispatch(cartAction.setCart({ cartData: data.data, isLoading: false }));
    }
  } catch ({ ...error }) {
    console.log(error);
  }
};

export const setMenuCartData = (userId) => async (dispatch) => {
  try {
    if (userId) {
      //dispatch(cartAction.setIsLoading({ isLoading: true }));
      const { data } = await axios(`cart/${userId}`);
      if (data.data)
        dispatch(
          cartAction.setMenuCart({ cartData: data.data, isLoading: false })
        );
    }
  } catch ({ ...error }) {
    console.log(error);
  }
};

export const addDish = (body) => async (dispatch) => {
  try {
    // TO-DO: add to show loading page
    const { data } = await axios.post("cart", body.cartPayload);

    if (data.data)
      dispatch(
        cartAction.addCartData({
          cartData: body.dish,
          isLoading: false,
          cartPayload: body.cartPayload,
        })
      );
    // TO-DO: Add when Cart is shown on menu page, add cart api should return dish.
  } catch ({ ...error }) {
    console.log(error);
  }
};

export const removeDish = (body) => async (dispatch) => {
  try {
    //dispatch(cartAction.setIsLoading({ isLoading: true }));
    const { data } = await axios.delete(
      "cart/" + body.userId + "/" + body.dishId
    );
    if (data.data)
      dispatch(
        cartAction.removeCardData({ dishId: body.dishId, isLoading: false })
      );
  } catch ({ ...error }) {
    console.log(error);
  }
};
