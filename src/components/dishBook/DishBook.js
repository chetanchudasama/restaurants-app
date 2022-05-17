import React, { useEffect, Suspense, useLayoutEffect } from "react";
import BottomBar from "../BottomBar";
import Dish from "../menu/Dish";
import cartBg from "../../assets/cartBg.png";
import browseLogo from "../../assets/browseLogo.png";
import MenuTopBar from "../menu/MenuTopBar";
import AppContainer from "../util/AppContainer";
import { useSelector, useDispatch } from "react-redux";
import "./dishBook.css";
import { S3_FOOD_FOLDER } from "../../store/constants";
import { SuspenseImg } from "../util/SuspendImg";
import { bottomBarActions } from "../../store/bottomBarSlice";
import ImageLoader from "../chef/ImageLoader";
import "../menu/browse-menu-button.css";
import ReactGA from "react-ga4";
import { setBookingData } from "../../store/loginActions";

const DishBook = () => {
  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/cart" });
    ReactGA.event({
      category: "tab",
      action: "dishBook",
    });
  }, []);
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBookingData(user.userid));
  }, [dispatch, user.userid]);

  const switchTab = (tabName) => {
    dispatch(bottomBarActions.loadTab({ tabName: tabName }));
  };

  const onBackClick = () => {
    switchTab('profile');
  };

  return (
    <AppContainer>
      <div className="cart-wrapper">
        <div className="cart-top-bar">
          <MenuTopBar
            name="Booked Dishes"
            cuisine="Schedule when we're live"
            notMenu={true}
            onBackClick={onBackClick}
          />
        </div>
        <section className="section-food-accordian">
          {user.booking && user.booking.bookedDishes ? (
            <div className="food-accordian">
              <p className="cart-header">Order Details</p>
              <div className="dish-wrapper-list">
                {user.booking.bookedDishes.map((bookedDish, i) => {
                  let dish = bookedDish.dish;
                  return (
                    <>
                      {dish.price && (
                        <Dish
                          key={i}
                          id={dish._id}
                          name={dish.name}
                          category={"Starters"}
                          price={bookedDish.price}
                          type={dish.type ? dish.type.toUpperCase() : "VEG"}
                          img={S3_FOOD_FOLDER + dish.img}
                          description={dish.description}
                          fromCart={false}
                          dish={dish}
                          calculateTotal={false}
                          isFromCart={false}
                          dealPrice={bookedDish.dealPrice}
                          parentComponent="dishBook"
                          isBooked={true}
                        />
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="browseDishMain">
                <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
                  <div className="browseLogo">
                    <div>
                      <SuspenseImg src={cartBg}></SuspenseImg>{" "}
                    </div>
                  </div>
                </Suspense>
                <div className="browseDetail">
                  <h5>Pre-order now, Pay later!</h5>
                  <p>You can pre-order 2 dishes from the first 8 chefs now. <br/>
                      When we launch, you can pay and schedule your delivery.
                  </p>
                  <button onClick={() => switchTab("chef")}>
                    <img src={browseLogo} alt="browseLogo" />
                    BROWSE Chefs
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
      <BottomBar />
    </AppContainer>
  );
};

export default DishBook;
