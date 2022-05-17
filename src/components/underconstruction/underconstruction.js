import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { underconstructionActions } from "../../store/underconstructionslice";
import "./underconstruction.css";
import ReactGA from "react-ga4";

const Underconstruction = (props) => {
  const dispatch = useDispatch();
  const ConstructionBackClick = () => {
    dispatch(underconstructionActions.onBackClick());
  };

  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/underConstruction" });
    ReactGA.event({
      category: "tab",
      action: "underConstruction",
    });
  }, []);

  return (
    <>
      <div id={props.id}>
        <div className="swiper_top_back_btn mg-10">
          <button
            onClick={ConstructionBackClick}
            type="button"
            className="btn back-btn"
          >
            <img
              src="images/icon-back.svg"
              alt="back"
              loading="lazy"
              className="back-img"
            />
          </button>
        </div>
        <div className="construcation">
          <img src="images/under-construction.png" alt="" />
        </div>
        <div className="construcation-title">UNDER CONSTRUCTION</div>
        <div className="construcation-contain">
        We are building a better search experience for you!
        </div>
        <div className="construcation-button">
          {/* <button>Go To Home</button> */}
        </div>
      </div>
    </>
  );
};

export default Underconstruction;
