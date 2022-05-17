import React, { useEffect, Suspense, useState, useLayoutEffect } from "react";
import BottomBar from "../BottomBar";
import Dish from "../menu/Dish";
import cartBg from "../../assets/cartBg.png";
import browseLogo from "../../assets/browseLogo.png";
import MenuTopBar from "../menu/MenuTopBar";
import AppContainer from "../util/AppContainer";
import { setCartData } from "../../store/cartActions";
import { cartAction } from "../../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";
import { S3_FOOD_FOLDER } from "../../store/constants";
import { SuspenseImg } from "../util/SuspendImg";
import { bottomBarActions } from "../../store/bottomBarSlice";
import ImageLoader from "../chef/ImageLoader";
import "../menu/browse-menu-button.css";
import { red } from "@material-ui/core/colors";
import ReactGA from "react-ga4";
import { checkout, checkoutUpdate } from "../../store/loginActions";
import { referActions } from "../../store/referSlice";

const GST_RATE = 5;

const Cart = () => {
  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/cart" });
    ReactGA.event({
      category: "tab",
      action: "cart",
    });
  }, []);
  const user = useSelector(({ auth }) => auth.user);
  const { cartData, totalCost } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();
  let maxDishesAllowed = user.maxDishes - user.totalDishesBooked;
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  useEffect(() => {
    dispatch(setCartData(user.userid));
  }, [dispatch, user.userid]);

  useLayoutEffect(() => {
    dispatch(cartAction.resetTotalCost());
  }, [dispatch]);

  const switchTab = (tabName) => {
    dispatch(bottomBarActions.loadTab({ tabName: tabName }));
  };

  const showReferView = () => {
    dispatch(bottomBarActions.hideCart());
    dispatch(referActions.onReferClick({from : "cart"}));
  };  

  const goToCheckout = (tabName) => {
    if (cartData.length <= maxDishesAllowed) {
      if(user.email){
        dispatch(checkoutUpdate(cartData, user));
      }else{
        switchTab(tabName);
      }
    }
  };

  const getGSTAmount = () => {
    // Calculate 5% GST
    return (parseInt(totalCost) * GST_RATE) / 100;
  };

  return (
    <AppContainer>
      <div className="cart-wrapper">
        <div className="cart-top-bar">
          <MenuTopBar name="Your Food Bag" cuisine="Cart" notMenu={true} />
        </div>
        <section className="section-food-accordian">
          {user.totalDishesBooked > 0 && user.totalDishesBooked >= user.maxDishes ? (
            <div className="browseDishMain">
              <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
                <div className="browseLogo">
                  <div>
                    <SuspenseImg src={cartBg}></SuspenseImg>{" "}
                  </div>
                </div>
              </Suspense>
              <div className="browseDetail">
                <h5>
                  Thank you for pre-ordering from our chefs.
                </h5>
                <p>
                  Refer your friends to get 3 more dishes!
                </p>
                <button onClick={() => showReferView()}>
                  <img src={browseLogo} alt="browseLogo" />
                  Refer
                </button>
              </div>
            </div>
          ) : cartData.length > 0 ? (
            <div className="food-accordian">
              <p className="cart-header">Order Details</p>
              <div className="dish-wrapper-list">
                {cartData.map((dish, i) => {
                  return (
                    <>
                      <Dish
                        key={i}
                        id={dish._id}
                        name={dish.name}
                        category={"Starters"}
                        price={dish.price}
                        type={dish.type ? dish.type.toUpperCase() : "VEG"}
                        img={S3_FOOD_FOLDER + dish.img}
                        description={dish.description}
                        fromCart={true}
                        dish={dish}
                        calculateTotal={true}
                        isFromCart={true}
                        parentComponent="cart"
                      />
                    </>
                  );
                })}
              </div>
            </div>
          ) : user.totalDishesBooked == 0 ? (
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
                <p>
                  You can pre-order 2 dishes from the first 8 chefs now. <br/>
                  When we launch, you can pay and schedule your delivery.
                </p>
                
                <button onClick={() => switchTab("chef")}>
                  <img src={browseLogo} alt="browseLogo" />
                  Browse Chefs
                </button>
              </div>
            </div>
          ) : user.totalDishesBooked > 0 ? (
            <div className="browseDishMain">
              <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
                <div className="browseLogo">
                  <div>
                    <SuspenseImg src={cartBg}></SuspenseImg>{" "}
                  </div>
                </div>
              </Suspense>
              <div className="browseDetail">
                <h5>
                  Pre-order now, Pay later!
                </h5>
                <p>
                  You can pre-order {maxDishesAllowed} more dishes. <br/>
                  You can schedule your order and pay when we're live.
                </p>
                <button onClick={() => switchTab("chef")}>
                  <img src={browseLogo} alt="browseLogo" />
                  Browse Chefs
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
      </div>
      {user.totalDishesBooked < user.maxDishes && cartData.length != 0 && (
        <div className="billing-section mx-2">
          <div className="billing-title">Billing Details</div>
          <div className="price-box">
            <div className="items-price items__first">
              <div className="price-title">Items Price</div>
              <div className="price-value"> &#8377; {parseInt(totalCost)} </div>
            </div>
            <div className="items-price items">
              <div className="price-title">Delivery Fees</div>
              <div className="price-value"> &#8377; 0 </div>
            </div>
            <div className="items-price items">
              <div className="price-title">Packging</div>
              <div className="price-value"> &#8377; 0 </div>
            </div>
            <div className="items-price items">
              <div className="price-title">GST</div>
              <div className="price-value"> &#8377; {getGSTAmount()} </div>
            </div>
            <div className="items-price items__total">
              <div className="price-title">Total</div>
              <div className="price-value"> &#8377; {Math.round(totalCost + getGSTAmount())} </div>
            </div>
          </div>
          {user.totalDishesBooked + cartData.length > user.maxDishes ? (
            <div
              className="cart-option bottom-box"
              id="cart_option"
              onClick={() => goToCheckout("checkout")}
            >
              <div className="cart-option-detail pay-box">
                <a className="menu-link m-auto">
                  <span>You can pre-order up to {maxDishesAllowed} dishes</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="pay-box bottom-box">
              <div className="view-bill">
                <div>&#8377; {Math.round(totalCost + getGSTAmount())} </div>
                <div>
                  <a className="view-bill-link" href="javacsript:void(0)">
                    view detailed bill
                  </a>
                </div>
              </div>
              <div
                className="pay-bill"
                onClick={() => goToCheckout("checkout")}
              >
                <span>Pre-order now and Pay Later</span>
              </div>
            </div>
          )}
        </div>
      )}
      {(user.totalDishesBooked >= user.maxDishes || cartData.length == 0) && <BottomBar />}
    </AppContainer>
  );
};
export default Cart;
