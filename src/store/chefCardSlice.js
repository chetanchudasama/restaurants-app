import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoriesLoaded: false,
  storiesActivated: false,
  dishId: "",
  storyImg: "",
  dishes: [],
};

const chefCardSlice = createSlice({
  name: "chefCard",
  initialState,
  reducers: {
    replaceCategories(state, action) {
      state.categories = action.payload.categories;
      state.categoriesLoaded = true;
    },
    onStoryClick(state, action) {
      state.storiesActivated = true;
      state.storyImg = action.payload.storyImg;
      state.dishId = action.payload.storyId;
      state.dishes = action.payload.dishes;
      state.categories = action.payload.categories;
    },
    onStoryBackClick(state) {
      state.storiesActivated = false;
      state.dishId = "";
    },
  },
});
