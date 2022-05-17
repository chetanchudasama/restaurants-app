import React from "react";
import styles from "./AppContainer.module.css";

const AppContainer = (props) => {
  return <div id={props.id} className={styles.left}>{props.children}</div>;
};

export default AppContainer;
