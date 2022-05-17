import React from "react";
import { useDispatch } from "react-redux";
import { chefActions } from "../../store/chefSlice";
import "./chef-cards.css";
import "../base.css";

const MenuCategoryStory = (props) => {
  const dispatch = useDispatch();
  const onStoryClick = () => {
    dispatch(
      chefActions.onStoryClick({
        storyId: props.key,
        storyImg: props.img,
        dishes: props.dishes,
        categories: props.categories,
        chefId: props.id,
        categoryName: props.caption,
      })
    );
  };
  return (
    <a onClick={onStoryClick}>
      <span className={"dish-img-span " + props.ringClass}>
        <img src={props.img} alt={props.alt} className="dish-img" />
      </span>
      <figcaption>{props.caption}</figcaption>
    </a>
  );
};

export default MenuCategoryStory;
