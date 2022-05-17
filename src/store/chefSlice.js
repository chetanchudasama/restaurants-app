import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chefList: [],
  chefListLoaded: false,
  categories: {},
  categoriesLoaded: false,
  menuClicked: false,
  chefId: "",
  storiesActivated: false,
  dishId: "",
  storyImg: "",
  dishes: [],
  isStoryPaused: false,
};

const chefSlice = createSlice({
  name: "Chef",
  initialState,
  reducers: {
    replaceChefList(state, action) {
      state.chefList = action.payload.chefList;
      state.chefListLoaded = true;
    },
    replaceCategories(state, action) {
      let chefId = action.payload.chefId;
      state.categories[chefId] = action.payload.categories;
      state.categories[chefId]['menuId'] = action.payload.id;
      state.categoriesLoaded = true;
    },
    onMenuClick(state, action) {
      state.menuClicked = true;
      state.storiesActivated = false;
      state.chefId = action.payload;
    },
    onBackClick(state) {
      state.menuClicked = false;
      state.chefId = "";
    },
    onRedirect(state) {
      state.menuClicked = false;
    },
    onRedirectBack(state) {
      state.menuClicked = true;
    },
    onStoryClick(state, action) {
      let chefId = action.payload.chefId;
      state.chefId = chefId;
      state.storiesActivated = true;
      state.storyImg = action.payload.storyImg;
      state.dishId = action.payload.storyId;
      state.dishes = action.payload.dishes;
      state.categories[chefId] = action.payload.categories;
      state.categoryName = action.payload.categoryName;
    },
    onStoryBackClick(state) {
      console.log("vlmkboiknfgjboi");
      state.menuClicked = false;
      state.storiesActivated = false;
      state.dishId = "";
    },
    onPause(state) {
      state.isStoryPaused = true;
    },
    addtocartclick(state) {
      state.storiesActivated = false;
    },
  },
});

export const chefActions = chefSlice.actions;

export default chefSlice;
