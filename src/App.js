import "./App.css";
import React, { Suspense, useState, useEffect, useCallback } from "react";
import AppWrapper from "./components/util/AppWrapper";
import Aside from "./components/util/Aside";
import Home from "./components/Home";
import Menu from "./components/menu/Menu";
import Dishes from "./components/search/Dishes";
import { useDispatch, useSelector } from "react-redux";
import DishStories from "./components/stories/DishStories";
import withSplashScreen from "./components/withSplashScreen";
import Cart from "./components/cart/Cart";
import UserProfile from "./components/userprofile/Index";
import Login from "./components/login/Login";
import SingleStorePage from "./components/SingleStorePage/Index";
import transitions from "@material-ui/core/styles/transitions";
import Underconstruction from "./components/underconstruction/underconstruction";
import TryingStories from "./components/stories/TryingStories";
import Checkout from "./components/cart/Checkout";
import DishBook from "./components/dishBook/DishBook";
import ReactGA from "react-ga4";
import Refer from "./components/refer/Refer";
import { reloadUser } from "./store/loginActions";
import mixpanel from 'mixpanel-browser';

function App() {
  const dispatch = useDispatch();
  let menuClicked = useSelector((state) => state.chef.menuClicked);
  let chefId = useSelector((state) => state.chef.chefId);
  let storiesActivated = useSelector((state) => state.chef.storiesActivated);
  let storyId = useSelector((state) => state.chef.storyId);
  let storyImg = useSelector((state) => state.chef.storyImg);
  let categoryName = useSelector((state) => state.chef.categoryName);
  let categoryDishes = useSelector((state) => state.chef.dishes);
  let categories = useSelector((state) => state.chef.categories);
  let displayDishes = useSelector((state) => state.bottomBar.dishes);
  let displayCart = useSelector((state) => state.bottomBar.cart);
  let profile = useSelector((state) => state.bottomBar.profile);
  let displayAccount = useSelector((state) => state.bottomBar.account);
  let displayBenefits = useSelector((state) => state.bottomBar.benefits);
  let storie = useSelector((state) => state.bottomBar.storie);
  let menuactive = useSelector((state) => state.chef.menuactive);
  let cart = useSelector((state) => state.bottomBar.cart);
  let checkout = useSelector((state) => state.bottomBar.checkout);
  let chefCategories = categories[chefId];
  let displayDishBook = useSelector((state) => state.bottomBar.dishBook);
  let underconstruction = useSelector(
    (state) => state.underconstruction.underconstruction
  );
  let refer = useSelector((state) => state.refer.isShownRefer);
  let dishclicks = useSelector((state) => state.bottomBar.dishclick);
  let isEditUserDetail = useSelector((state) => state.bottomBar.isEditUserDetail);
  const user = useSelector(({ auth }) => auth.user);
  let displayChef = useSelector((state) => state.bottomBar.chef);
  let mpUserInitiated =
    localStorage.getItem("mpUserInitiated") === "true";

  useEffect(() => {
    if (user && user.userid) dispatch(reloadUser(user.userid));
  }, []);

  ReactGA.initialize("G-ND9RB7HYBY");
  mixpanel.init('7c8e374528b94b1fda0c2c7d4fc53eb1', {debug: true});
  if(!mpUserInitiated){
    let mpUserId = Math.floor(100000 + Math.random() * 900000);
    mixpanel.identify(mpUserId);
    localStorage.setItem("mpUserInitiated", true);
  }

  return (
    <AppWrapper>
      {underconstruction && <Underconstruction />}
      {refer && <Refer />}
      {checkout && <Checkout />}
      {storiesActivated && (
        // <TryingStories/>
        <DishStories
          categories={chefCategories}
          dishes={categoryDishes}
          // eslint-disable-next-line no-undef
          id={displayAccount && !displayChef ? "menuclick" : "menuunclick"}
          headerImg={storyImg}
          name={categoryName}
        />
      )}
      {/* {dishstore &&<DishStories />} */}
      {menuClicked && (
        <Menu
          // eslint-disable-next-line no-undef
          id={storie || !displayChef ? "menuclick" : "menuunclick"}
          chefId={chefId}
        />
      )}
      {storie && <SingleStorePage />}
      {displayAccount && <Login />}
      {displayBenefits && <Login showBenefits={true} />}
      {isEditUserDetail && <Login activeStepper={4} />}
      {dishclicks && (
        <Dishes id={!displayDishes ? "dishclick" : "dishunclick"} />
      )}
      {displayCart && <Cart />}
      {profile && <UserProfile />}
      {displayDishBook && <DishBook />}
      {
        <Home
          chefId={chefId}
          id={
            storie ||
            profile ||
            menuactive ||
            menuClicked ||
            displayAccount ||
            isEditUserDetail ||
            storiesActivated ||
            displayDishes ||
            underconstruction ||
            refer ||
            cart ||
            checkout ||
            displayDishBook
              ? "dataclick"
              : "dataunclick"
          }
        />
      }
      {/* {<Home chefId={chefId} id={storie ||  profile ||menuactive ||  menuClicked || displayAccount ||  storiesActivated ||  displayDishes || account || cart ? "dataclick" : "dataunclick"} />} */}

      <Aside img="images/chef-preparing-pasta-desktop-banner.jpg" />
    </AppWrapper>
  );
}

export default withSplashScreen(App);
