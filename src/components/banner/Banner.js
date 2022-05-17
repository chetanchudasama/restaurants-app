import React,{Suspense} from "react";
import styles from "./Banner.module.css";
import ChefCardLoader from "../chef/ChefCardLoader";

const Banner = (props) => {
  return (
    <div>
       <Suspense fallback={<ChefCardLoader/>}>
        <img
          src={props.src}
          alt="banner"
          loading="lazy"
          className={styles["banner-img"]}
          />
          </Suspense>
    </div>
  );
};

export default Banner;