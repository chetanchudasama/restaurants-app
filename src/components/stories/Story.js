import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bottomBarActions } from "../../store/bottomBarSlice";
import { addDish } from "../../store/cartActions";
import { chefActions } from "../../store/chefSlice";
import { fetchDishBand } from "../../store/menuActions";
import { SuspenseImg } from "../util/SuspendImg";
import "./story.css";

const Story = (props) => {
  const dispatch = useDispatch();
  const userID = useSelector(({ auth }) => auth.user.userid);
  const dish = useSelector(({ dish }) => dish);

  const onStoryBackClick = () => {
    dispatch(chefActions.onStoryBackClick());
  };

  const onPause = () => {
    dispatch(chefActions.onPause());
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

  const addToCard = async () => {
    dispatch(chefActions.onMenuClick(props.dish.chefId));
    // uncomment when user can add to cart from stories.
    // if (!userID) {
    //   dispatch(chefActions.addtocartclick())
    //   dispatch(bottomBarActions.loadTab({ tabName: "account" }))
    // } else{
    //   dispatch(addDish({ userId: userID, dishId: props.id }));
    // }
  };

  useEffect(() => {
    dispatch(fetchDishBand(props.id));
  }, dispatch);

  return (
    <div onClick={onPause}>
      <div className="swiper_Top">
        <div className="swiper_Title">
          <div className="swiper_Title_img">
            <SuspenseImg
              src={props.categoryImg}
              className="storyImg"
            ></SuspenseImg>
          </div>
          <p>{props.name}</p>
        </div>
        <div className="swiper_top_menu">
          <div className="swiper_top_back_btn">
            <button
              onClick={onStoryBackClick}
              type="button"
              className="btn back-btn"
            >
              <img src="images/icon-back.svg" alt="back" loading="lazy" />
            </button>
          </div>
          <div className="dishItems">
            <ul>
              {props.headers
                .filter((header) => props.dish.name === header)
                .map((header) => (
                  <li>{header}</li>
                ))}
              {/* {props.headers.filter((header) => props.dish.name !== header).map((header) =>
                <li>{header}</li>
              )} */}
            </ul>
          </div>
        </div>
      </div>
      <div className="swipper_main_img">
        <SuspenseImg src={props.img} className="storyImg" />
      </div>
      {/* <img className="full-page-bg" src={props.img} /> */}
      <div className="swipper_bottom">
        <div className="swipper_bottom_first">
          <div className="items_value">
            <div className="items_price">
              <h6>Original Price</h6>
            </div>
            <div className="plus_taxes">
              <h5>
                <span className="currency">&#8377;</span> {props.dish.price}
              </h5>
              {/* <p>plus taxes</p> */}
            </div>
          </div>
          <div onClick={addToCard} className="addcart_btn">
            <button>
              <p>Go to Menu</p>
              <span>+</span>
            </button>
          </div>
        </div>
        {dish.dishBand ? (
          <h6 className="media-dish-cap orange-text">
            {getTextForBand(dish.dishBand.band)}
          </h6>
        ) : (
          ""
        )}
        {/* {dish.dishBand ? (
          <h6 className="media-dish-cap orange-text">
            {100 - Math.round(dish.dishBand.percentBookedInBand)}% remaining
            <progress
              className="band-progress"
              value={Math.round(dish.dishBand.percentBookedInBand)}
              max="100"
            ></progress>
          </h6>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default Story;
