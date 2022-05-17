import React, { useState } from "react";
import "./chef-cards.css";
import Skeleton from "react-loading-skeleton";
import { SuspenseImg } from "../util/SuspendImg";

const ChefCardInfo = (props) => {
  const [loading, setLoading] = useState(false);
  
  const onImgLoad = () => {
    setLoading(false);
  };
  return (
    <>
    <Skeleton style={{display: loading ? "block" : "none"}} />
    <div style={{display: loading ? "none" : "flex"}}
      className={
        "media" + (props.additionalClasses ? (" " + props.additionalClasses) : "")
      }
    >
      <SuspenseImg src={props.img} alt=""></SuspenseImg>
      {/* <img src={props.img} alt="" onLoad={onImgLoad} /> */}
      {/* <figure className="media-image">
        
      </figure> */}
      <div className="media-body chef-experience">
        <h5>{props.header}</h5>
        <p>{props.desc}</p>
      </div>
    </div>
    </>
  );
};

export default ChefCardInfo;
