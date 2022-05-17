import axios from "axios";
import { API_LOCAL, API_TEST } from "./constants";
import { storieAction } from "./storieSlice";

export const setStoryData = (data, from) => {
    return async (dispatch) => {
        try {
            dispatch(storieAction.setStoryData({ from, storieData: data, isOpen: true }));
        } catch (e) {
            console.log("e", e);
        }
    };
};
