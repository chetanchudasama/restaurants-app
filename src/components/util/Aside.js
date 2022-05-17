import React, { useEffect } from 'react';
import styles from './Aside.module.css'
import ReactGA from "react-ga4";

const Aside = (props) => {
  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/desktop" });
    ReactGA.event({
      category: "tab",
      action: "desktop",
    });
  }, []);
  return (
    <aside className={styles.aside}>
      <p className={styles['aside-info']}>Desktop experience will reach you soon! <br/>For now, you can check out all our chefs on your mobile browser.</p>
      <img src={props.img} alt="Right View" className={styles['aside-img']}/>
    </aside>
  );
};

export default Aside;
