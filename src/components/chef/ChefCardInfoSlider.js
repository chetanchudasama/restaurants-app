import React from "react";
import "./chef-cards.css";
import ChefCardInfoWrapper from "./ChefCardInfoWrapper";

const ChefCardInfoSlider = (props) => {
  const items = props.items;
  let cardClick = false;

  const handleStart = () => {
    console.log("org scroller clicked");
    cardClick = true;
  };

  const handleEnd = () => {
    console.log("org scroller released");
    cardClick = false;
  };
  
  return (
    <div className="row organisation">
      <div className="col-12 org-col">
        <h4 className="card-title">{props.header}</h4>
        <div {...props.scrollerBind} className="organisation-slider org-scroller">
          {items.map((item, i) => <ChefCardInfoWrapper key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default ChefCardInfoSlider;
