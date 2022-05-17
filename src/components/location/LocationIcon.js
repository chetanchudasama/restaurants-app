import React from "react";
import "./location-icon.css";

const LocationIcon = () => {
  return (
    <li className="select-location-img">
      <span className="span-loc-img">
        <img src="images/location.svg" alt="location" />
      </span>
    </li>
    // <li className={styles["select-location-img"]}>
    //   <span className={styles["span-loc-img"]}>
    //     <img src="images/location.svg" alt="location" />
    //   </span>
    // </li>
  );
};

export default LocationIcon;
