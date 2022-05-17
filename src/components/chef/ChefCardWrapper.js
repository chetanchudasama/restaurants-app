import React from "react";
import "./chef-card-wrapper.css";

const ChefCardWrapper = (props) => {
  return (
    <section className="section-slider-wrapper">
      <section className="slider">{props.children}</section>
    </section>
  );
};

export default ChefCardWrapper;
