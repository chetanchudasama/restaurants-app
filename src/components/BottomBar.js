import React, { useState } from "react";
import "./bottom-bar.css";
import { bottomBarActions } from "../store/bottomBarSlice";
import { useDispatch, useSelector } from "react-redux";

const BottomBar = () => {
  const dispatch = useDispatch();
  const chef = useSelector((state) => state.bottomBar.chef);
  const dishes = useSelector((state) => state.bottomBar.dishes);
  const cart = useSelector((state) => state.bottomBar.cart);
  const account = useSelector((state) => state.bottomBar.account);
  const profile = useSelector((state) => state.bottomBar.profile);
  const user = useSelector((state) => state.auth.user);
  const bottombardisplay = useSelector((state) => state.bottomBar.bottombardisplay);
  const switchTab = (tabName) => {
    dispatch(bottomBarActions.loadTab({ tabName: tabName }));
  };
  return (
    <>
    {bottombardisplay ? (
    <section className="footer-wrapper">
      <ul className="footer-links">
        <li onClick={() => switchTab("chef")} className="chefs-bottom-menu">
          {chef ? (
            <a className="menu-link active">
              <figure>
                <img src="images/chef-selected.svg" />
                <figcaption>Chefs</figcaption>
              </figure>
            </a>
          ) : (
            <a className="menu-link">
              <figure>
                <img src="images/chef.svg" />
                <figcaption>Chefs</figcaption>
              </figure>
            </a>
          )}
        </li>
        <li onClick={() => switchTab("dishes")} className="dishes-bottom-menu">
          {dishes ? (
            <a className="menu-link active">
              <figure>
                <img src="images/dishes-selected.svg" />
                <figcaption>Dishes</figcaption>
              </figure>
            </a>
          ) : (
            <a className="menu-link">
              <figure>
                <img src="images/dishes.svg" />
                <figcaption>Dishes</figcaption>
              </figure>
            </a>
          )}
        </li>
        <li onClick={() => switchTab("cart")} className="cart-bottom-menu">
          {cart ? (
            <a className="menu-link active">
              <figure>
                <img src="images/cart-selected.svg" />
                <figcaption>Cart</figcaption>
              </figure>
            </a>
          ) : (
            <a className="menu-link">
              <figure>
                <img src="images/cart.svg" />
                <figcaption>Cart</figcaption>
              </figure>
            </a>
          )}
        </li>
        <li onClick={() => switchTab(user.username ? "profile" : "account")} className="account-bottom-menu">
          {account || profile ? (
            <a className="menu-link active">
              <figure>
                <img src="images/account-selected.svg" />
                <figcaption>Account</figcaption>
              </figure>
            </a>
          ) : (
            <a className="menu-link">
              <figure>
                <img src="images/account.svg" />
                <figcaption>Account</figcaption>
              </figure>
            </a>
          )}
        </li>
      </ul>
    </section>) : ("")}
    </>
  );
};

export default BottomBar;
