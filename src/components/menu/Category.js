import React, { useLayoutEffect, useState } from "react";
import "./menu-categories.css";
import "../base.css";
import Dish from "./Dish";
import { Collapse } from "react-collapse";
import { Accessible } from "./Accesible";
import { S3_FOOD_FOLDER } from "../../store/constants";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cartSlice";

const Category = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const dishes = props.dishes;
  const toggleCategory = () => {
    isOpen = setIsOpen(!isOpen);
  }

  const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   if (!isOpen) {
  //     dispatch(cartAction.resetTotalCost());
  //   }
  // }, [dispatch, isOpen]);

  return (
    <Collapse isOpened={true}>
      {isOpen ? (
        <li className="collapsible-item active" id={props.categoryid}>
          <div className="collapsible-header" onClick={() => toggleCategory(props.categoryid)}>
            <div className="title-dish">
              <h5>{props.name}</h5>
              <p className="count-item">
                <span className="num">{props.dishes.length}</span>items
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
              {dishes.map((dish, i) => (
                <Dish
                  key={i}
                  id={dish._id}
                  name={dish.name}
                  category={props.category}
                  price={dish.price}
                  type={dish.type}
                  img={S3_FOOD_FOLDER + dish.img}
                  description={dish.description}
                  saff={props.saff}
                  dish={dish}
                  onCheckPrice={props.onCheckPrice}
                  calculateTotal={false}
                  isFromCart={false}
                  setShowAddedItemPopup={props.setShowAddedItemPopup}
                  parentComponent={props.parentComponent}
                />
              ))}
            </div>
          </div>
        </li>
      ) : (
        <li className="collapsible-item" id={props.categoryid} onClick={() => toggleCategory(props.categoryid)}>
          <div className="collapsible-header">
            <div className="title-dish">
              <h5>{props.name}</h5>
              <p className="count-item">
                <span className="num">{props.dishes.length}</span>items
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
  );
};

export default Category;
