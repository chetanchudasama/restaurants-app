import React from "react";
import "./chef-cards.css";

const ChefName = (props) => {
  return (
    <div className="chef-detail">
      <h4 className="chef-name">Chef {props.name}</h4>
      <a className="btn-view-profile" role="button">
        Happy to serve you 
        {/* <span>&#062;&#062;</span> */}
      </a>
    </div>
  );
};

export default ChefName;
