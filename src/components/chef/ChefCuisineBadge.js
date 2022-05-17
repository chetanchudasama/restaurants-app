import React from "react";
import "../base.css";
import "./chef-cards.css";

const ChefCuisineBadge = (props) => {
  return (
    <div className="btn-chef-div">
      <a className="btn btn-chef" href="#" role="button">
        {props.cuisine}
      </a>
    </div>
  );
};

export default ChefCuisineBadge;
