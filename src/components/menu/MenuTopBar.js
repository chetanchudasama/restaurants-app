import React from "react";
import { useDispatch } from "react-redux";
import { chefActions } from "../../store/chefSlice";
import { bottomBarActions } from "../../store/bottomBarSlice";

import "./menu-topbar.css";

const MenuTopBar = (props) => {
  const dispatch = useDispatch();
  const onBackClick = () => {
    if(!props.notMenu){
      dispatch(chefActions.onBackClick());
    }
    dispatch(bottomBarActions.loadTab({ tabName: "chef" }));
  };

  return (
    <ul className="common-nav">
      <li className="back-btn-wrapper">
        <button onClick={props.onBackClick ? props.onBackClick : onBackClick} type="button" className="btn back-btn">
          <img src="images/icon-back.svg" alt="back" loading="lazy" />
        </button>
      </li>
      <li className="nav-chef-detail">
        <h3 className="chef-title">
          {props.name + (props.notMenu ? "" : "’s Menu")}
        </h3>
        <p className="chef-caption">{props.cuisine}</p>
      </li>
      {/* <li className="msg-btn-div">
        <button className="btn btn-msg" type="button">
          <img src="images/message.svg" alt="message" loading="lazy" />
        </button>
      </li> */}
    </ul>
  );
};

export default MenuTopBar;

{
  /* <ul className={styles["common-nav"]}>
      <li className={styles["back-btn-wrapper"]}>
        <button type="button" className={`${styles["btn"]} ${styles["back-btn"]}`}>
          <img src="images/icon-back.svg" alt="back" loading="lazy" />
        </button>
      </li>
      <li className={styles["nav-chef-detail"]}>
        <h3 className={styles["chef-title"]}>Satish Bhosle’s Menu</h3>
        <p className={styles["chef-caption"]}>Intercontinental Cuisine</p>
      </li>
      <li className={styles["msg-btn-div"]}>
        <button className={`${styles["btn"]} ${styles["btn-msg"]}`} type="button">
          <img src="images/message.svg" alt="message" loading="lazy" />
        </button>
      </li>
    </ul> */
}
