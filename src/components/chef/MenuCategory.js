import React from "react";
import "./chef-cards.css";
import MenuCategoryStory from "./MenuCategoryStory";
import { S3_FOOD_FOLDER } from "../../store/constants";

const MenuCategory = (props) => {
  const menuCategory = props.items;
  return (
    <div>
      <div className="cuisine-slider-item">
        <MenuCategoryStory
          key={menuCategory._id}
          img={S3_FOOD_FOLDER + menuCategory.img}
          alt={menuCategory.alt}
          caption={menuCategory.name}
          ringClass={menuCategory.ringClass}
          dishes={menuCategory.dishes}
          categories={props.categories}
          id={props.id}
        />
      </div>
    </div>
  );
};

export default MenuCategory;
