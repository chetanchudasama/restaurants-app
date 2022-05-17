import React, { useEffect, useLayoutEffect, useState } from "react";
import AppContainer from "../util/AppContainer";
import MenuSearch from "./MenuSearch";
import MenuTopBar from "./MenuTopBar";
import styles from "./Menu.module.css";
import MenuTypeFilter from "./MenuTypeFilter";
import MenuCategories from "./MenuCategories";
import BrowseMenuButton from "./BrowseMenuButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchChefMenu } from "../../store/menuActions";
import ModelSaff from "../search/ModelStaff";
import ModelCuisines from "../search/ModelCuisines";
import { bottomBarActions } from "../../store/bottomBarSlice";
import { loginActions } from "../../store/loginSlice";
import "./browse-menu-button.css";
import { updateDishCheckedInUser, updateUser } from "../../store/loginActions";
import { setMenuCartData } from "../../store/cartActions";
import { ToastContainer } from "react-toastify";
import { underconstructionActions } from "../../store/underconstructionslice";
import { chefActions } from "../../store/chefSlice";
import ReactGA from "react-ga4";
import { referActions } from "../../store/referSlice";

const Menu = (props) => {
  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/menu" });
    ReactGA.event({
      category: "tab",
      action: "menu",
    });
  }, []);

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState();
  const [browseValue, setBrowseValue] = useState({ model: false, value: "" });
  const [showOpenValidation, setShowOpenValidation] = useState(false);
  const [showDishPriceValidation, setShowDishPriceValidation] = useState(false);
  const menuDetails = useSelector((state) => state.menu.menuDetails);
  const menuLoaded = useSelector((state) => state.menu.menuLoaded);
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [showAddedItemPopup, setShowAddedItemPopup] = useState(false);
  const user = useSelector(({ auth }) => auth.user);
  const { menuCartData, totalCost } = useSelector(({ cart }) => cart);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState(() => {});
  const [button, setButton] = useState("");

  useEffect(() => {
    if (totalCost !== 0) {
      setShowAddedItemPopup(true);
      setShowOpenValidation(false);
      setShowDishPriceValidation(false);
    } else {
      setShowAddedItemPopup(false);
    }
  }, [totalCost]);

  const showCart = () => {
    dispatch(bottomBarActions.loadTab({ tabName: "cart" }));
  };

  const freeMenuOpens = useSelector((state) => state.auth.freeMenuOpens);
  const freeMenuidsOpened = useSelector(
    (state) => state.auth.freeMenuidsOpened
  );
  const FREE_OPENS = user.maxDishes ? user.maxDishes : 2;
  const FREE_OPENS_AFTER_SIGNUP = user.maxChefs ? user.maxChefs : 4;
  const FREE_DISH_OPENS = user.maxDishPrices ? user.maxDishPrices : 10;

  let askToOpenWithoutSignup = !user.referral && freeMenuOpens < FREE_OPENS;
  let askForSignup = !user.referral && freeMenuOpens >= FREE_OPENS;

  let askToOpenWithSignup =
    user.referral && user.menuOpens < FREE_OPENS_AFTER_SIGNUP;
  let askForRefferal = user.referral && user.menuOpens >= FREE_OPENS_AFTER_SIGNUP;

  let askForSignupToCheckPrice = !user.referral;
  let askForRefferalToCheckPrice =
    user.referral && user.dishPriceChecked >= FREE_DISH_OPENS;
  let showFreeDishCheckPriceRemaining =
    user.referral && user.dishPriceChecked < FREE_DISH_OPENS;

  const showSignUp = () => {
    dispatch(bottomBarActions.loadTab({ tabName: "account" }));
  };

  const showUnderConstruction = () => {
    dispatch(chefActions.onBackClick());
    dispatch(underconstructionActions.onSearchClick());
  };

  const showReferView = () => {
    dispatch(chefActions.onRedirect());
    dispatch(referActions.onReferClick({from : "chef"}));
  };

  const openMenu = () => {
    if (user.referral) {
      dispatch(updateUser(user, menuDetails._id));
      setShowOpenValidation(false);
    } else {
      dispatch(loginActions.openFreeMenu(menuDetails._id));
      setShowOpenValidation(false);
    }
  };

  const validateMenuOpens = () => {
    if (freeMenuidsOpened.includes(menuDetails._id)) {
      setShowOpenValidation(false);
    } else if (user.menuIdsOpened.includes(menuDetails._id)) {
      setShowOpenValidation(false);
    } else {
      if (
        askToOpenWithoutSignup ||
        askForSignup ||
        askToOpenWithSignup ||
        askForRefferal
      ) {
        setShowOpenValidation(true);
        formValidationMessage(true, false);
      }
    }
  };

  const browseMenuAction = () => {
    if (askForSignupToCheckPrice) {
      setShowDishPriceValidation(true);
      formValidationMessage(false, true);
      
    } else if (askForRefferalToCheckPrice) {
      setShowDishPriceValidation(true);
      formValidationMessage(false, true);
    }
    else if (freeMenuidsOpened.includes(menuDetails._id)) {
      setShowOpenValidation(false);
      setModalShow(true);
    } else if (user.menuIdsOpened.includes(menuDetails._id)) {
      setShowOpenValidation(false);
      setModalShow(true);
    } else {
      if (
        askToOpenWithoutSignup ||
        askForSignup ||
        askToOpenWithSignup ||
        askForRefferal
      ) {
        setShowOpenValidation(true);
        formValidationMessage(true, false);
      }
      else{
        setModalShow(true);
      }
    }
  };

  const validateDishPriceCheck = () => {
    if (askForSignupToCheckPrice) {
      setShowDishPriceValidation(true);
      formValidationMessage(false, true);
      return false;
    } else if (askForRefferalToCheckPrice) {
      setShowDishPriceValidation(true);
      formValidationMessage(false, true);
      return false;
    } else {
      setShowDishPriceValidation(false);
      return true;
    }
  };

  const onCheckPrice = async (dishID, setShowAdd) => {
    if (validateDishPriceCheck()) {
      dispatch(updateDishCheckedInUser(user, dishID));
      setShowAdd(true);
    }
    //call pricing api to get current price
  };

  const formValidationMessage = (openValidation, priceValidation) => {
    if (openValidation || showOpenValidation) {
      if (askToOpenWithoutSignup) {
        let freeOpens = (FREE_OPENS - freeMenuOpens);
        let menu = freeOpens == 1 ? "menu" : "menus";
        let chef = freeOpens == 1 ? " chef" : " chefs";
        setMessage(
          "You can unlock " + menu + " of " +
            freeOpens + chef + " before sign up"
        );
        setAction(() => openMenu);
        setButton("Unlock");
      } else if (askToOpenWithSignup) {
        let freeOpens = (FREE_OPENS_AFTER_SIGNUP - user.menuOpens);
        let menu = freeOpens == 1 ? "menu" : "menus";
        let chef = freeOpens == 1 ? "chef" : "chefs";
        setMessage(
          "You can unlock " + menu + " of " +
            freeOpens +
            " more " + chef
        );
        setAction(() => openMenu);
        setButton("Unlock");
      } else if (askForSignup) {
        let freeOpens = (FREE_OPENS_AFTER_SIGNUP - FREE_OPENS);
        let menu = freeOpens == 1 ? "menu" : "menus";
        let chef = freeOpens == 1 ? "chef" : "chefs";
        setMessage(
          "You can unlock " + menu + " of " +
            freeOpens +
            " more " + chef + " on sign up"
        );
        setAction(() => showSignUp);
        setButton("Sign up");
      } else if (askForRefferal) {
        let freeOpens = FREE_OPENS_AFTER_SIGNUP;
        let menu = freeOpens == 1 ? "menu" : "menus";
        let chef = freeOpens == 1 ? "chef" : "chefs";
        setMessage(
          "You can unlock " + menu + " of " +
            FREE_OPENS_AFTER_SIGNUP +
            " more " + chef + " on Referral"
        );
        setAction(() => showReferView);
        setButton("Refer");
      }
    } else if (priceValidation || showDishPriceValidation) {
      if (askForSignupToCheckPrice) {
        setMessage("Sign up to check current price of dishes");
        setAction(() => showSignUp);
        setButton("Sign up");
      } else if (askForRefferalToCheckPrice) {
        setMessage("Refer your friends to check more dish prices");
        setAction(() => showReferView);
        setButton("Refer");
      } else if (showFreeDishCheckPriceRemaining) {
        let freeOpens = (FREE_DISH_OPENS - user.dishPriceChecked);
        let dish = freeOpens = 1 ? "dish" : "dishes";
        setMessage(
          "Check current price of up to " +
            (FREE_DISH_OPENS - user.dishPriceChecked) +
            " " + dish
        );
        setAction(() => validateDishPriceCheck);
        setButton("Okay");
      }
    }
  };

  useEffect(() => {
    if (menuDetails?.categories) {
      setCategoriesdata(menuDetails?.categories);
      dispatch(setMenuCartData(user.userid));
    }
  }, [menuDetails?.categories]);

  useEffect(() => {
    if (showFreeDishCheckPriceRemaining) {
      formValidationMessage(false, true);
    }
  }, [showFreeDishCheckPriceRemaining]);

  let chefId = props.chefId;
  useEffect(() => {
    dispatch(fetchChefMenu(chefId));
  }, [dispatch]);

  return (
    <AppContainer id={props.id}>
      {menuLoaded && (
        <MenuTopBar
          name={"Chef " + menuDetails.name}
          cuisine={menuDetails.cuisine}
        />
      )}
      <div
        onClick={validateMenuOpens}
        className={`${styles["page-inner"]} + ${
          showOpenValidation ? styles["opaque"] : ""
        }`}
      >
        <MenuSearch
          categories={menuDetails.categories}
          setCategoriesdata={setCategoriesdata}
        />
        <MenuTypeFilter
          allCategorie={menuDetails.categories}
          categories={categoriesdata}
          setCategoriesdata={setCategoriesdata}
        />
        {menuLoaded && (
          <MenuCategories
            categories={categoriesdata}
            saff={false}
            onCheckPrice={onCheckPrice}
            setShowAddedItemPopup={setShowAddedItemPopup}
            parentComponent="chef"
          />
        )}
      </div>
      <BrowseMenuButton
        className="brwose-menu-btn"
        setModalShow={setModalShow}
        showOpenValidation={showOpenValidation}
        hideSpace={
          showOpenValidation || showDishPriceValidation || showAddedItemPopup
        }
        setShowOpenValidation={setShowOpenValidation}
        validateMenuOpens={validateMenuOpens}
      />

      <ModelSaff
        show={modalShow}
        setBrowseValue={setBrowseValue}
        categories={categoriesdata}
        setModalShow={setModalShow}
      />
      {/* <ModelCuisines
        browseValue={browseValue}
        setBrowseValue={setBrowseValue}
      /> */}
      <div
        className={
          showOpenValidation || showDishPriceValidation || showAddedItemPopup
            ? "browser-snackbar active"
            : "browser-snackbar deactive"
        }
        id="cart_option"
      >
        <div
          onClick={
            !showOpenValidation &&
            !showDishPriceValidation &&
            showAddedItemPopup
              ? showCart
              : action
          }
          className="browser-snackbar-detail"
        >
          <ul className="footer-list">
            <li className="list-item-options">
              <a href="#" className="menu-link">
                {!showOpenValidation &&
                  !showDishPriceValidation &&
                  showAddedItemPopup && (
                    <div className="total-price-container">
                      <span>
                        {menuCartData.length} Items | &#8377;{" "}
                        {parseInt(totalCost)}
                      </span>
                      <span onClick={showCart}>
                        View Cart
                        <img
                          src="images/icon-view-cart.svg"
                          alt="view-cart"
                          loading="lazy"
                        />
                      </span>
                    </div>
                  )}
                {(showOpenValidation || showDishPriceValidation) && (
                  <span>{button}</span>
                )}
              </a>
            </li>
            {(showOpenValidation || showDishPriceValidation) && (
              <li className="list-item-description">
                <div className="total-items">
                  <a href="#" className="cart-items">
                    <span>{message}</span>
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </AppContainer>
  );
};

export default Menu;
