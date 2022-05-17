import React from "react";
import "./chef-card-slider.css";

const ChefCardSlider = (props) => {
  return (
    <div className="slick-item">
      <div className="slider-item">{props.children}</div>
    </div>
  );
};

export default ChefCardSlider;
