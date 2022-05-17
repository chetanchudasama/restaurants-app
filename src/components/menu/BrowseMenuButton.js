import React, { useState } from "react";
import "./browse-menu-button.css";
import "../base.css";
import { propTypes } from "react-bootstrap/esm/Image";

const BrowseMenuButton = (props) => {
  return (
    <>
      <section className="footer-wrapper-option">
        <div className="browse-menu-wrapper">
          <div className={props.hideSpace ? "brwose-menu-div " + props.className : "brwose-menu-div browse-menu-show-space " + props.className}>
            <button
              onClick={props.validateMenuOpens}
              type="button"
              className={
                props.showOpenValidation
                  ? "btn btn-browse-menu no-pointer"
                  : "btn btn-browse-menu"
              }
            >
              <figure>
                <img
                  src="images/icon-browse-menu.svg"
                  alt="browse-menu"
                  loading="lazy"
                />
                <figcaption>Browse Menu</figcaption>
              </figure>
            </button>
          </div>
        </div>
        {/* <div className="cart-option" id="cart_option">
          <div className="cart-option-detail">
            <ul className="footer-cart-list">
              <li className="cart-list-item-left">
                <div className="cart-total-items">
                  <a href="#" className="cart-items">
                    <span>2</span>
                    <span>items</span>
                  </a>
                </div>
                <div className="cart-list-item-total">
                  <span className="currency">&#8377;</span>
                  <span className="total">601</span>
                </div>
              </li>
              <li className="cart-list-item-right">
                <a href="#" className="menu-link">
                  <span>View Cart</span>
                  <img
                    src="images/icon-view-cart.svg"
                    alt="view-cart"
                    loading="lazy"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        
      </section>
    </>
  );
};

export default BrowseMenuButton;
