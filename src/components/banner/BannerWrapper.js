import React, { Suspense } from "react";
import "./banner-wrapper.css";
import ChefCardLoader from "../chef/ChefCardLoader";

const BannerWrapper = (props) => {
  return (
    <section className="banner">
      <div className="banner-wrapper active" id="banner_wrapper">
        {/* <Suspense fallback={console.log("loading")}> */}
        <div className="banner-slider">{props.children}</div>
        {/* </Suspense> */}
      </div>

    </section>
  );
};

export default BannerWrapper;
