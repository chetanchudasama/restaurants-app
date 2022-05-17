import React from "react";
import "./location-selection.css";

const LocationSelection = () => {
  return (
    <li className="select-location">
      <select className="form-select" aria-label="Default select example">
        <option defaultValue>Mumbai</option>
      </select>
    </li>
    // <li className={styles["select-location"]}>
    //   <select
    //     className={styles["form-select"]}
    //     aria-label="Default select example"
    //   >
    //     <option defaultValue>Select Location</option>
    //     <option value="1">Home - Malad West, Mumbai</option>
    //     <option value="2">Two</option>
    //     <option value="3">Three</option>
    //   </select>
    // </li>
  );
};

export default LocationSelection;
