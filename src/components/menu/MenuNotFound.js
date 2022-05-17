import React from "react";
import "./menu-categories.css";
import "../base.css";

const MenuNotFound = (props) => {
  return (
    <section className="section-menu-notfound">
      <div>
        <img src={props.img} />
      </div>
      <h4>{props.header}</h4>
      <p>{props.description}</p>
    </section>
  );
};

export default MenuNotFound;
