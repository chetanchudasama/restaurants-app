/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { bottomBarActions } from "../../store/bottomBarSlice";
import { AccountDescWrapper, AccountDescriptionRow } from "./styled";
import { Collapse } from "react-collapse";
import ReactTooltip from "react-tooltip";
import React, { useState } from "react";
import "../menu/menu-categories.css";
import "../../components/base.css";

const MIN_CHEF_MENU_OPENED = 0;
const MAX_CHEF_MENU_OPENED = 8;
const MIN_DISH_PRICE_CHECK = 0;
const MAX_DISH_PRICE_CHECK = 20;

const UserAccountDescription = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  let [isOpenFAQ, setIsOpenFAQ] = useState(false);
  let [isOpenPricing, setIsOpenPricing] = useState(false);
  const [isCopiedReferralCode, setIsCopiedReferralCode]  = useState(false);

  const openDishBookView = () => {
    dispatch(bottomBarActions.loadTab({ tabName: "dishBook" }));
  };

  const getTotalBookedDish = () => {
    return user ? user.totalDishesBooked : 0;
  };

  const getFreeDishes = () => {
    return user ? user.freeDishes?  user.freeDishes : 0 : 0;
  };

  const toggleFAQ = () => {
    setIsOpenFAQ(!isOpenFAQ);
  };

  const togglePricing = () => {
    setIsOpenPricing(!isOpenPricing);
  };

  const getChefMenuOpenedInPercentage = (isMaxChef) => {
    return (
      (((isMaxChef ? user.maxChefs : user.menuOpens) - MIN_CHEF_MENU_OPENED) *
        100) /
      (Math.max(MAX_CHEF_MENU_OPENED, user.menuOpens) - MIN_CHEF_MENU_OPENED)
    );
  };

  const getDishPriceInPercentage = () => {
    return (
      ((user.dishPriceChecked - MIN_DISH_PRICE_CHECK) * 100) /
      (Math.max(user.maxDishPrices, user.dishPriceChecked) - MIN_DISH_PRICE_CHECK)
    );
  };
  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setIsCopiedReferralCode(true)
  }

  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          title: "Cuirato Referral Invite",
          text: "Hey! Here's an exclusive code to join Cuirato. Pre-Order dishes now!",
          url: "https://beta.cuirato.com/",
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  return (
    <AccountDescWrapper>
      <AccountDescriptionRow>
        <div className="heading-title">
          <p>Chefs Unlocked</p>
        </div>
        <div className="box-progress">
          <div className="box-container">
            <div className={user.menuOpens < MAX_CHEF_MENU_OPENED ? "progress" : "progress progress-hide"}>
              <div
                className="progress-bar bg-c-red"
                style={{ width: `${getChefMenuOpenedInPercentage(false)}%` }}
              >
                <div className="progress-value">{user.menuOpens}</div>
              </div>
              {
                user.menuOpens < MAX_CHEF_MENU_OPENED ? (
                    <div
                className="progress-bar bg-c-red info"
                style={{ width: `${getChefMenuOpenedInPercentage(true)}%` }}
              >
                
              <div className="progress-value"><span>{user.maxChefs} </span><span className="tooltip-span" data-tip data-for="maxChef"></span></div>
              
                <ReactTooltip id="maxChef" type="warning" place="bottom">
                  <span>you can explore maximum {user.maxChefs} chef</span>
                </ReactTooltip>
              </div>
                  ) : ("")
              }
              <div className="progress-left-value">{MIN_CHEF_MENU_OPENED}</div>
              {
                user.menuOpens < MAX_CHEF_MENU_OPENED ? (
                    <div className="progress-right-value">{MAX_CHEF_MENU_OPENED}</div>      
                  ) : ("")
              }
            </div>
          </div>
        </div>
      </AccountDescriptionRow>
      <AccountDescriptionRow>
        <div className="heading-title">
          <p>Dish prices check</p>
        </div>
        <div className="box-progress">
          <div className="box-container">
            <div className={user.dishPriceChecked < user.maxDishPrices ? "progress" : "progress progress-hide"}>
              <div
                className="progress-bar bg-c-red"
                style={{ width: `${getDishPriceInPercentage()}%` }}
              >
                <div className="progress-value">{user.dishPriceChecked}</div>
              </div>
              <div className="progress-left-value">{MIN_DISH_PRICE_CHECK}</div>
              {
                user.dishPriceChecked < user.maxDishPrices ? (
                    <div className="progress-right-value">{user.maxDishPrices}</div>      
                  ) : ("")
              }
              
            </div>
          </div>
        </div>
      </AccountDescriptionRow>
      <AccountDescriptionRow>
        <div className="heading-title" onClick={openDishBookView}>
          <p>Dishes booked({getTotalBookedDish()})</p>
          <button onClick={() => {}} type="button" className="right-arrow-btn">
            <img src="images/icon-right.svg" alt="right" loading="lazy" />
          </button>
        </div>
      </AccountDescriptionRow>
      <AccountDescriptionRow>
        <div className="heading-title">
          <img className="free-dishes-icon" src="./images/Icons/Icon-02.svg" alt="" />
          <p>Free dishes</p>
          <b>{getFreeDishes()}</b>
        </div>
      </AccountDescriptionRow>
      <AccountDescriptionRow>
        <div className="referral-box">
          <div className="share-code-box">
            <div className="gift-box">
                <img className="gift-img" src="images/Icons/Icon-03.svg" alt="gift" />
            </div>
            <div>
                <div className="get-rewards"><span>Refer friends, Get 1 dish per referral</span></div>
                <div className="d-flex align-items-center my-5">
                  <span className="mx-3">Share your code -</span>
                  <span className="mx-3">{user.referralCode}</span>
                  <a className="mx-3" onClick={copyReferralCode}><img className="copy-img" src="images/copy.png" alt="copy" /></a>
                </div>
                <p className="referral-code-messgae">{isCopiedReferralCode ? "Referral code copied" : ""}</p> 
            </div>
          </div>
          <div className="share-box">
            <a onClick={handleShareButton}>
              <img className="share-img" src="images/Icons/Icon-01.svg" alt="" />
              <span>Share</span>
            </a>
          </div>
        </div>
      </AccountDescriptionRow>
      {/* <section className="section-food-accordian">
        <div className="food-accordian">
          <ul className="collapsible user-account">
            <Collapse isOpened={true}>
              {isOpenFAQ ? (
                <li className="collapsible-item active">
                  <div
                    className="collapsible-header user-profile"
                    onClick={() => toggleFAQ()}
                  >
                    <div className="title-dish">
                      <h5>FAQ</h5>
                      <p className="count-item">
                        <span className="num">{1}</span>
                        faq
                      </p>
                    </div>
                    <div className="icon-down-div">
                      <img
                        src="images/icon-collapse.svg"
                        alt="icon-collapse"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="collapsible-body">
                    <div className="dish-wrapper-list">
                      <h1> Content </h1>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="collapsible-item" onClick={() => toggleFAQ()}>
                  <div className="collapsible-header user-profile">
                    <div className="title-dish">
                      <h5>FAQ</h5>
                      <p className="count-item">
                        <span className="num">{1}</span>
                        faq
                      </p>
                    </div>
                    <div className="icon-down-div">
                      <img
                        src="images/icon-collapse.svg"
                        alt="icon-collapse"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              )}
            </Collapse>
          </ul>
        </div>
      </section>
      <section className="section-food-accordian">
        <div className="food-accordian">
          <ul className="collapsible user-account">
            <Collapse isOpened={true}>
              {isOpenPricing ? (
                <li className="collapsible-item active">
                  <div
                    className="collapsible-header user-profile"
                    onClick={() => togglePricing()}
                  >
                    <div className="title-dish">
                      <h5>Pricing</h5>
                      <p className="count-item">
                        <span className="num">{1}</span>
                        pricing
                      </p>
                    </div>
                    <div className="icon-down-div">
                      <img
                        src="images/icon-collapse.svg"
                        alt="icon-collapse"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="collapsible-body">
                    <div className="dish-wrapper-list">
                      <h1> Content </h1>
                    </div>
                  </div>
                </li>
              ) : (
                <li
                  className="collapsible-item"
                  onClick={() => togglePricing()}
                >
                  <div className="collapsible-header user-profile">
                    <div className="title-dish">
                      <h5>Pricing</h5>
                      <p className="count-item">
                        <span className="num">{1}</span>
                        pricing
                      </p>
                    </div>
                    <div className="icon-down-div">
                      <img
                        src="images/icon-collapse.svg"
                        alt="icon-collapse"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              )}
            </Collapse>
          </ul>
        </div>
      </section> */}
    </AccountDescWrapper>
  );
};

export default UserAccountDescription;
