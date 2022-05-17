import React from "react";
import LocationIcon from "./location/LocationIcon";
import LocationSelection from "./location/LocationSelection";
import SearchButton from "./SearchButton";
import "./top-bar.css";

const TopBar = () => {
  return (
    <ul className="search-nav">
      <LocationIcon />
      <LocationSelection />
      <SearchButton />
    </ul>
  );
};

export default TopBar;
