import "./chef-cards.css";
import "../base.css";
import React from "react";
import { useDispatch } from "react-redux";
import { chefActions } from "../../store/chefSlice";

const MenuButton = (props) => {
  const dispatch = useDispatch();
  const onMenuClick = () => {
    dispatch(chefActions.onMenuClick(props.chefId));
  };
  return (
    <div className="menu-wrapper">
      <button onClick={onMenuClick} className="btn btn-menu">
        <figure>
          <img src={props.img} alt={props.alt} />
        </figure>
        <span>{props.title}</span>
      </button>
    </div>
  );
};

export default MenuButton;
