import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/chefActions";
import "./chef-cards.css";
import MenuCategory from "./MenuCategory";
import MenuCategoryLoader from "./MenuCategoryLoader";


const ChefMenuCategorySlider = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.chef.categories);
  const categoriesLoaded = useSelector((state) => state.chef.categoriesLoaded);
  const chefCategories = categories[props.id] ? categories[props.id] : [];

  useEffect(() => {
    dispatch(fetchCategories(props.id));
  }, [dispatch]);

  const categoriesWithClass = chefCategories.map((category) => {
    return {
      ...category,
      ringClass: "ring-" + category.color,
    };
  });

  return (
    categoriesLoaded ? (
      <div className="row cuisine">
        <div className="col-12">
          <h4 className="card-title">{props.header}</h4>
        </div>
        <div className="cuisine-slider-wrapper">
          <div {...props.scrollerBind} className="cuisine-slider">
            {categoriesWithClass.map((menuCategory, i) => (
              <MenuCategory key={i} id={props.id} items={menuCategory} categories={categoriesWithClass} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <MenuCategoryLoader></MenuCategoryLoader>
    )
  );
};

export default ChefMenuCategorySlider;