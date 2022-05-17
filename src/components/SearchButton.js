import React from "react";
import "./search-button.css";
import { useDispatch } from "react-redux";
import { underconstructionActions } from "../store/underconstructionslice";

const SearchButton = () => {
  const dispatch = useDispatch();
  const handleclick = () => {
    dispatch(underconstructionActions.onSearchClick());
  }
  return (
    <li className="search-btn-div" onClick={() => handleclick()}>
      <button className="btn btn-search" type="button">
        <img src="images/search.svg" alt="search" />
      </button>
    </li>
    // <li className={styles["search-btn-div"]}>
    //   <button
    //     className={`${styles["btn"]} ${styles["btn-search"]}`}
    //     type="button"
    //   >
    //     <img src="images/search.svg" alt="search" />
    //   </button>
    // </li>
  );
};

export default SearchButton;
