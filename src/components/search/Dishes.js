import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuTopBar from "../menu/MenuTopBar";
import BottomBar from "../BottomBar";
import MenuSearch from "../menu/MenuSearch";
import MenuTypeFilter from "../menu/MenuTypeFilter";
import AppContainer from "../util/AppContainer";
import { fetchDishes } from "../../store/menuActions";
import MenuCategories from "../menu/MenuCategories";
import BrowseMenuButton from "../menu/BrowseMenuButton";
import "./dishes.css";
import ModelSaff from "./ModelStaff";
import ModelCuisines from "./ModelCuisines";
import { updateDishCheckedInUser } from "../../store/loginActions";
import ReactGA from "react-ga4";
import { ToastContainer } from "react-toastify";
import "../menu/browse-menu-button.css";
import { bottomBarActions } from "../../store/bottomBarSlice";

const Dishes = (props) => {
  useEffect(() => {
    //ReactGA.send({ hitType: "pageview", page: "/dishes" });
    ReactGA.event({
      category: "tab",
      action: "dishes",
    });
  }, []);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const freeMenuidsOpened = useSelector(
    (state) => state.auth.freeMenuidsOpened
  );
  const dishes = useSelector((state) => state.menu.dishes);
  const numberOfMenus = useSelector((state) => state.menu.numberOfMenus);
  const noDishes = useSelector((state) => state.menu.noDishes);
  const dishesLoaded = useSelector((state) => state.menu.dishesLoaded);
  const [modalShow, setModalShow] = useState();
  const [browseValue, setBrowseValue] = useState({ model: false, value: "" });
  const allDishCategories = [];
  dishes.forEach((dish) => {
    dish.categories.forEach((category) => {
      allDishCategories.push(category);
    });
  });
  const categories = dishesLoaded ? allDishCategories : []; //dishes?.map(dish => dish.categories);
  const [categoriesdata, setCategoriesdata] = useState(categories);
  const [showAddedItemPopup, setShowAddedItemPopup] = useState(false);
  const { cartData, totalCost } = useSelector(({ cart }) => cart);

  const handleBrowse = () => {
    setModalShow(true);
  };

  useEffect(() => {
    if (totalCost !== 0) {
      setShowAddedItemPopup(true);
    } else {
      setShowAddedItemPopup(false);
    }
  }, [totalCost]);

  const onCheckPrice = async (dishID, setShowAdd) => {
    dispatch(updateDishCheckedInUser(user, dishID));
    setShowAdd(true);
    //call pricing api to get current price
  };

  useEffect(() => {
    if (categories) {
      setCategoriesdata(categories);
    }
  }, [dishesLoaded, numberOfMenus]);

  const menuIds = user.phonenumber ? user.menuIdsOpened : freeMenuidsOpened;

  useEffect(() => {
    dispatch(fetchDishes(menuIds));
  }, [dispatch, menuIds]);

  const showCart = () => {
    dispatch(bottomBarActions.loadTab({ tabName: "cart" }));
  };

  return (
    <AppContainer id={props.id}>
      <MenuTopBar
        name="Your Menu"
        cuisine="All dishes from your unlocked menus"
        notMenu={true}
      />
      <div className="page-inner">
        <MenuSearch
          categories={categories}
          setCategoriesdata={setCategoriesdata}
        />
        <MenuTypeFilter
          allCategorie={categories}
          categories={categoriesdata}
          setCategoriesdata={setCategoriesdata}
        />
        {
          <MenuCategories
            categories={categoriesdata}
            saff={true}
            noDishes={noDishes}
            onCheckPrice={onCheckPrice}
            setShowAddedItemPopup={setShowAddedItemPopup}
            parentComponent="dishes"
          />
        }
      </div>
      {categoriesdata && categoriesdata.length > 0 && (
        <div className="staffBrowser">
          <BrowseMenuButton setModalShow={setModalShow} />
        </div>
      )}
      <BottomBar />
      <ModelSaff
        categories={categoriesdata}
        show={modalShow}
        setBrowseValue={setBrowseValue}
        setModalShow={setModalShow}
      />
      <ModelCuisines
        browseValue={browseValue}
        setBrowseValue={setBrowseValue}
      />
      <div
        className={
          showAddedItemPopup
            ? "browser-snackbar active"
            : "browser-snackbar deactive"
        }
        id="cart_option"
        style={{ marginBottom: "65px" }}
      >
        <div className="browser-snackbar-detail">
          <ul className="footer-list">
            <li className="list-item-options">
              <a href="#" className="menu-link">
                <div className="total-price-container">
                  <span>
                    {cartData.length} Items | &#8377; {parseInt(totalCost)}
                  </span>
                  <span onClick={showCart}>View Cart</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </AppContainer>
  );
};

export default Dishes;
