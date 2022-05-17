import React from "react";
import "./chef-cards.css";
import ChefCardInfo from "./ChefCardInfo";

const ChefCardInfoWrapper = (props) => {
  var item = props.item;
  
  return (
    <div className="org-slick-item">
      <div className="org-slider-item">
        <ChefCardInfo
          img={item.img ? item.img : "images/ihm.png"}
          header={item.header}
          desc={item.desc}
          additionalClasses={item.additionalClasses}
        />
      </div>
    </div>
  );
};

export default ChefCardInfoWrapper;
