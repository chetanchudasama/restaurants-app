import React, { useState } from "react";
import "./menu-type-filter.css";

const MenuTypeFilter = ({ setCategoriesdata, allCategorie }) => {
  const [isVegActive, setIsVegActive] = useState(false);
  const [isNonVegActive, setIsNonVegActive] = useState(false);
  const [isEggActive, setIsEggActive] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleVegNonVeg = (type) => {
    switch (type) {
      case "veg":
        setIsVegActive(!isVegActive);
        if (!isVegActive) {
          selected.push("veg");
        } else {
          removeItemOnce(selected, "veg");
        }
        break;
      case "non veg":
        setIsNonVegActive(!isNonVegActive);
        if (!isNonVegActive) {
          selected.push("non veg");
        } else {
          removeItemOnce(selected, "non veg");
        }
        break;
      case "egg":
        setIsEggActive(!isEggActive);
        if (!isEggActive) {
          selected.push("egg");
        } else {
          removeItemOnce(selected, "egg");
        }
        break;
      default:
        break;
    }
    const cateArray = allCategorie
      ?.map((categorie) => {
        const dishes = categorie.dishes?.filter(
          (dish) => selected.length == 0 || selected.includes(dish.type)
        );
        return { ...categorie, dishes };
      })
      .filter(({ dishes }) => dishes.length);
    setCategoriesdata(cateArray);
  };

  const removeItemOnce = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  return (
    <section className="section-food-type">
      <ul className="food-list">
        <li
          className={`${
            isVegActive ? "Active" : "notactive"
          } food-list-item veg`}
          onClick={() => handleVegNonVeg("veg")}
        >
          <figure>
            <img src="images/icon-veg.svg" alt="veg" loading="lazy" />
            <figcaption>VEG</figcaption>
          </figure>
        </li>
        <li
          className={`${
            isEggActive ? "Active" : "notactive"
          } food-list-item egg`}
          onClick={() => handleVegNonVeg("egg")}
        >
          <figure>
            <img src="images/icon-egg.svg" alt="egg" loading="lazy" />
            <figcaption>EGG</figcaption>
          </figure>
        </li>
        <li
          className={`${
            isNonVegActive ? "Active" : "notactive"
          } food-list-item non-veg`}
          onClick={() => handleVegNonVeg("non veg")}
        >
          <figure>
            <img src="images/icon-non-veg.svg" alt="non-veg" loading="lazy" />
            <figcaption>NON VEG</figcaption>
          </figure>
        </li>
      </ul>
    </section>
  );
};

export default MenuTypeFilter;
