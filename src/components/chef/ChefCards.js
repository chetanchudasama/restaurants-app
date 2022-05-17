import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChefList } from "../../store/chefActions";

import ChefCardWrapper from "./ChefCardWrapper";
import ChefCardsSlider from "./ChefCardsSlider";
import { propTypes } from "react-bootstrap/esm/Image";
// import "./sliderstyles.css";

const ChefCards = (props) => {
  const dispatch = useDispatch();
  const chefList = useSelector((state) => state.chef.chefList);
  const chefListLoaded = useSelector((state) => state.chef.chefListLoaded);

  useEffect(() => {
    dispatch(fetchChefList());
  }, [dispatch]);

  return (
    <ChefCardWrapper>
      <ChefCardsSlider
        chefList={chefList}
        chefListLoaded={chefListLoaded}
        autoSwipe={props.autoSwipe}
      />
    </ChefCardWrapper>
  );
};

export default ChefCards;
