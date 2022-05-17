import React, { useEffect, useState } from "react";
import "./menu-categories.css";
import "../base.css";
import { useDispatch, useSelector } from "react-redux";
import { bottomBarActions } from "../../store/bottomBarSlice";
import { setStoryData } from "../../store/storieAction";
import { cartAction } from "../../store/cartSlice";
import { addDish, removeDish } from "../../store/cartActions";
import { toast } from "react-toastify";
import { fetchDishBand } from "../../store/menuActions";
import { updateDishPrice } from "../../store/loginActions";

const Dish = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const dish = useSelector(({ dish }) => dish);
  const { menuCartData, cartData } = useSelector(({ cart }) => cart);
  const [showAdded, setShowAdded] = useState(
    menuCartData.map((cart) => cart.dishId)?.includes(props.id)
  );
  const [showAdd, setShowAdd] = useState(
    !showAdded && user.dishIdsChecked?.includes(props.id)
  );
  const [showSchedule, setShowSchedule] = useState(props.isBooked);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [dishBand, setDishBand] = useState({});
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [isAddDish, setIsAddDish] = useState(false);
  const cart = useSelector((state) => state.bottomBar.cart);

  const onAddDish = async (dishID) => {
    if (!user.userid) {
      dispatch(bottomBarActions.loadTab({ tabName: "account" }));
    } else {
      dispatch(addDish({ cartPayload : {userId: user.userid, dishId: dishID, dealPrice: currentPrice}, dish: props.dish }));
      setShowAdd(false);
      setShowAdded(true);
      setIsAddDish(true);
      props.setShowAddedItemPopup(true);
    }
  };

  const onRemoveDish = async (dishId, setShowAdd, setShowAdded, cost, ingredientCost, dishBand) => {
    if (!props.fromCart) {
      setShowAdd(true);
      setShowAdded(false);
    }
    setIsAddDish(false);
    dispatch(removeDish({ userId: user.userid, dishId: dishId, isActive: false }));
  };

  const onDishStorieClick = () => {
    dispatch(bottomBarActions.loadTab({ tabName: "storie" }));
    dispatch(
      setStoryData(
        [{ img: props.img, name: props.name, cuisine: props?.cuisine }],
        props.parentComponent
      )
    );
  };

  const showOneDishValidation = () => {
    toast.info("You can only add one portion per dish", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const updateDish = (dishId, setShowAdd, cost, ingredientCost, dishBand) => {
    const isRemovedDish = false;
    dispatch(updateDishPrice(cost, ingredientCost, dishBand, setCurrentPrice, false, dishId, isRemovedDish, props.fromCart));
    props.onCheckPrice(dishId, setShowAdd);
  };

  const getTextForBand = (band) => {
    switch (band) {
      case "HIDDEN_GEM":
        return "Hidden Gems: 80-99% off";
      case "MIDDLE":
        return "Popular Platter: 60-80% off";
      case "TRENDING":
        return "Hot Buns: 40-60% off";
      case "NORMAL":
          return "No discount";
      default:
        break;
    }
  };

  const getTextForBandInfo = (band) => {
    switch (band) {
      case "HIDDEN_GEM":
        return "Unexplored delicacies";
      case "MIDDLE":
        return "Catching attention";
      case "TRENDING":
        return "Most booked";
      case "NORMAL":
        return "No discounts";
      default:
        break;
    }
  };

  const switchTab = (tabName) => {
    dispatch(bottomBarActions.loadTab({ tabName: tabName }));
  };

  useEffect(() => {
    dispatch(fetchDishBand(props.id, setDishBand));
  }, [dispatch]);

  useEffect(() => {
    if (dishBand.band && (showAdd || showAdded)) {
      dispatch(
        updateDishPrice(
          props.price,
          props.dish.ingredientCost,
          dishBand.band,
          setCurrentPrice,
          props.calculateTotal,
          props.id,
          false,
          props.isFromCart ? props.isFromCart : showAdded
        )
      );
    }
  }, [dispatch, showAdd, showAdded, dishBand]);

  const getDealPrice = () => {
    if (props.fromCart) {
      const index = cartData.findIndex((x) => x._id === props.id);
      return index !== -1 && cartData[index].dealPrice ? parseInt(cartData[index].dealPrice) : parseInt(currentPrice);
    }
    return parseInt(currentPrice);
  }

  return (
    <div className="dish-wrapper-list-item">
      <div className="media">
        <div className="media-image">
          <ul className="food-list">
            {props.type === "VEG".toLowerCase() && (
              <li className="food-list-item veg saff">
                <figure>
                  <img src="images/icon-veg.svg" alt="veg" loading="lazy" />
                  <figcaption>{props.type}</figcaption>
                </figure>
              </li>
            )}
            {/* {props.saff === true && <li className="food-list-item saff">
              <figure>
                <img src="images/icon-veg.svg" alt="veg" loading="lazy" />
                <figcaption>{props.type}</figcaption>
              </figure>
            </li>} */}
            {props.type === "EGG".toLowerCase() && (
              <li className="food-list-item egg saff">
                <figure>
                  <img src="images/icon-egg.svg" alt="egg" loading="lazy" />
                  <figcaption>{props.type}</figcaption>
                </figure>
              </li>
            )}
            {props.type === "NON VEG".toLowerCase() && (
              <li className="food-list-item non-veg saff">
                <figure>
                  <img
                    src="images/icon-non-veg.svg"
                    alt="non-veg"
                    loading="lazy"
                  />
                  <figcaption>{props.type}</figcaption>
                </figure>
              </li>
            )}
          </ul>
        </div>
        <div className="media-body">
          <div className="row m-0">
            <div className="col pl-0 left">
              <div className="media-dish-details">
                <div className="main-details">
                  <div>
                    <h4 className="media-dish-title">{props.name}</h4>
                  </div>
                  {props.saff === true ? (
                    <div className="media-dish-price">
                      <span className="currency">
                        {showAdd || showAdded
                          ? "Current Price: "
                          : "Original Price: "}
                        &#8377;
                      </span>
                      <span
                        className={
                          dish.dishBandLoaded && (showAdd || showAdded)
                            ? "price strike"
                            : "price"
                        }
                      >
                        {props.price}
                      </span>
                      <span
                        className={
                          dish.dishBandLoaded && (showAdd || showAdded)
                            ? "price"
                            : "hide"
                        }
                      >
                        {props.dealPrice ? parseInt(props.dealPrice) : getDealPrice()}
                      </span>
                    </div>
                  ) : (
                    <div className="media-dish-price">
                      <span className="currency">
                        {showAdd || showAdded
                          ? "Current Price: "
                          : "Original Price: "}
                        &#8377;
                      </span>
                      <span
                        className={
                          dish.dishBandLoaded && (showAdd || showAdded)
                            ? "price strike"
                            : "price"
                        }
                      >
                        {props.price}
                      </span>
                      <span
                        className={
                          dish.dishBandLoaded && (showAdd || showAdded)
                            ? "price"
                            : "hide"
                        }
                      >
                         {props.dealPrice ? parseInt(props.dealPrice) : getDealPrice()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="media-dish-description">
                  <p>{props.description}</p>
                </div>
                {dish.dishBandLoaded ? (
                  <h6 className="media-dish-cap orange-text">
                    {showAdded || showAdd
                      ? "Voila! You got " +
                        Math.floor(
                          ((props.price - (props.dealPrice ? parseInt(props.dealPrice) : getDealPrice())) * 100) /
                            props.price
                        ) +
                        "% off"
                      : getTextForBand(dishBand.band)}
                    <img
                      className="info-icon"
                      src="images/information-button.svg"
                      alt="i"
                      onClick={() => {
                        setShowInfoBox(!showInfoBox);
                      }}
                    />
                    {showInfoBox ? (
                      <div className="info-box">
                        <p>
                          {getTextForBandInfo(dishBand.band)}
                          <br />
                          <a onClick={() => switchTab(user.userid ? "profile" : "benefits")}>Know more</a>
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </h6>
                ) : (
                  ""
                )}
                {dish.dishBandLoaded ? (
                  <h6 className="media-dish-cap orange-text">
                    {Math.round(dishBand.percentBookedInBand)}% Offer claimed
                    <progress
                      className="band-progress"
                      value={Math.round(dishBand.percentBookedInBand)}
                      max="100"
                    ></progress>
                  </h6>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col p-0 right">
              <div className="media-dish-add">
                <figure onClick={onDishStorieClick} className="dish-figure">
                  <span className="img-ring-red">
                    <img src={props.img} alt="profile image" />
                  </span>
                </figure>
                <div className="dish-add-wrapper">
                  {!showAdd && !showAdded && !showSchedule ? (
                    <button
                      type="button"
                      className="btn btn-add"
                      onClick={() =>
                        updateDish(
                          props.id,
                          setShowAdd,
                          props.price,
                          props.dish.ingredientCost,
                          dishBand.band
                        )
                      }
                    >
                      <span>Check Price</span>
                      <img
                        src="images/Icons/Icon-06.svg"
                        alt="search-item"
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    ""
                  )}
                  {showAdd && !showSchedule ? (
                    <button
                      type="button"
                      className="btn btn-add"
                      onClick={() => onAddDish(props.id)}
                    >
                      <span>Add to Cart</span>
                      <img
                        src="images/icon-plus.svg"
                        alt="search-item"
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    ""
                  )}
                  {showAdded && !showSchedule ? (
                    <div className="input-group add-items">
                      <button
                        className="btn btn-minus-item"
                        onClick={() => onRemoveDish(props.id, setShowAdd, setShowAdded, props.price, props.dish.ingredientCost, dishBand.band)}
                      >
                        <img
                          src="images/icon-minus.svg"
                          alt="search-item"
                          loading="lazy"
                        />
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1"
                        disabled={cart}
                      />
                      <button
                        className="btn btn-add-item"
                        onClick={() => showOneDishValidation(props.id)}
                      >
                        <img
                          src="images/icon-plus.svg"
                          alt="search-item"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  {showSchedule ? (
                    <div className="input-group add-items item-schedule">
                      
                      <button
                      type="button"
                      className="btn btn-added btn-schedule"
                      >
                      <span> Schedule </span>
                      </button>
                      <img src="images/time-period.svg"/>
                    </div>
                  ) : ( "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.saff === true && (
        <div>
          <div className="food-panner">
            <li className="food-list-item foods">
              <figure>
                <img src={props.dish.chefImg} alt="veg" loading="lazy" />
              </figure>
            </li>
            <div className="food-dish">
              <h4 className="media-dish-title">Chef {props.dish.chefName}</h4>
              <h5 className="media-dish-title2">
                {props.category.cuisine} Cuisne Specialist
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dish;
