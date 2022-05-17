import React from "react";
import "./menu-search.css";
import "../base.css";

const MenuSearch = ({ setCategoriesdata, categories }) => {
  const handleChange = (e) => {
    const lowercasedValue = e.target.value.toLowerCase().trim();
    if (lowercasedValue === "") setCategoriesdata(categories);
    else {
      const filteredData = [];
      categories?.forEach(category => {
        let filteredDishes = category.dishes.filter((dish) => 
          (dish.name.includes(lowercasedValue) ||
            (dish.description && dish.description.includes(lowercasedValue)))
        );
        if(filteredDishes.length > 0){
          let filterCategory = Object.assign({}, category);
          filterCategory.dishes = filteredDishes;
          filteredData.push(filterCategory);
        }
      });
      if (filteredData) {
        setCategoriesdata(filteredData);
      }
    }
  };
  return (
    <section className="section-search-items">
      <div className="row">
        <div className="col">
          <div className="input-group">
            <button className="btn btn-search-item append-item-left">
              <img
                src="images/search_item.svg"
                alt="search-item"
                loading="lazy"
              />
            </button>
            <input
              type="text"
              className="form-control"
              placeholder="Search your favorite"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        {/* <div className="col-auto">
          <button type="button" className="btn btn-menu-bar">
            <img
              src="images/icon-menu-bar.svg"
              alt="search-item"
              loading="lazy"
            />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default MenuSearch;

{
  /* <section className={styles["section-search-items"]}>
      <div className={`${baseStyles["row"]} ${styles["row"]}`}>
        <div className={`${baseStyles["col"]} ${styles["col"]}`}>
          <div className={`${baseStyles["input-group"]} ${styles["input-group"]}`}>
            <button
              className={`${baseStyles["btn"]} ${styles["btn-search-item"]} ${baseStyles["append-item-left"]} ${styles["append-item-left"]}`}
            >
              <img
                src="images/search_item.svg"
                alt="search-item"
                loading="lazy"
              />
            </button>
            <input
              type="text"
              className={`${baseStyles["form-control"]} ${styles["form-control"]}`}
              placeholder="Search for Cuisine"
            />
          </div>
        </div>
        <div className={baseStyles["col-auto"]}>
          <button
            type="button"
            className={`${baseStyles["btn"]} ${styles["btn-menu-bar"]}`}
          >
            <img
              src="images/icon-menu-bar.svg"
              alt="search-item"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </section> */
}
