import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga4";
import "../cart/cart.css";
import MenuTopBar from "../menu/MenuTopBar";
import ReferralCode from "../userprofile/ReferralCode";
import { referActions } from "../../store/referSlice";
import "./refer.css";
import { bottomBarActions } from "../../store/bottomBarSlice";
import { chefActions } from "../../store/chefSlice";

const Refer = (props) => {
  const dispatch = useDispatch();
  const { from } = useSelector(({ refer }) => refer);

  const referBackButton = () => {
    dispatch(referActions.onBackClick());
    switch(from){
      case "chef":
        dispatch(chefActions.onRedirectBack());
        break;
      case "cart":
        dispatch(bottomBarActions.loadTab({"tabName": from}));
        break;
      default:
        dispatch(bottomBarActions.loadTab({"tabName": "chef"}));
    }
  };

  useEffect(() => {
    ReactGA.event({
      category: "tab",
      action: "Refer",
    });
  }, []);

  return (
    <>
      <div className="refer-container">
        <div className="refer-top-bar">
          <MenuTopBar
            name="Refer"
            cuisine="share with your friend"
            notMenu={true}
            onBackClick={referBackButton}
          />
        </div>
        <div className="refer-content">
          <ReferralCode />
        </div>
      </div>
    </>
  );
};

export default Refer;
