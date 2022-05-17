import React from "react";
import "./menu-categories.css";
import "../base.css";
import Category from "./Category";
import MenuNotFound from "./MenuNotFound";

const MenuCategories = (props) => {
  const categories = props.categories;
  return (
    <section className="section-food-accordian">
      <div className="food-accordian">
        <ul className="collapsible">
          {props.noDishes ? (
            <MenuNotFound
              img="images/Empty State-05.svg"
              header="Unlock Chef Menus."
              description="Browse Chefs and unlock their menu. Get quick access to all their dishes here."
            />
          ) : props.categories?.length > 0 ? (
            props.categories.map((category, index) => (
              <Category
                key={index}
                toggleCategory={props.toggleCategory}
                name={category.name}
                totalDishes={category.dishes.length}
                dishes={category.dishes}
                saff={props.saff}
                isOpens={category?.isOpen}
                categoryid={category._id}
                category={category}
                onCheckPrice={props.onCheckPrice}
                setShowAddedItemPopup={props.setShowAddedItemPopup}
                parentComponent={props.parentComponent}
              />
            ))
          ) : (
            <MenuNotFound
              img="images/Empty State-06.svg"
              header="No dishes match your search."
              description="Please check menus of other chefs."
            />
          )}
        </ul>
      </div>
    </section>
  );
};

export default MenuCategories;
