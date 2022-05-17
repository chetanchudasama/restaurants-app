import React from "react";
import ChefCuisineBadge from "./ChefCuisineBadge";

import ChefName from "./ChefName";
import ChefProfilePic from "./ChefProfilePic";
import ChefCardInfo from "./ChefCardInfo";
import "../base.css";
import "./chef-cards.css";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../../store/storieAction";
import { bottomBarActions } from "../../store/bottomBarSlice";

const ChefCardProfile = (props) => {
  const item = props.item;
  const labels = props.labels;
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const freeMenuidsOpened = useSelector(
    (state) => state.auth.freeMenuidsOpened
  )
  var menuId = useSelector((state) => state.chef.categories[item._id]);
  if(menuId){menuId = menuId['menuId']}
  console.log(menuId);
  
  const onClickProfile = () => {
    dispatch(bottomBarActions.loadTab({ tabName: "storie" }));
    dispatch(setStoryData([{ img: props.item.profileImg, name: props.item.name, cuisine: props.item.cuisine }], "chef"))
  }

  return (
    <div className="row profile">
      <div className="col-6 profile-left">
        <ChefCuisineBadge cuisine={item.cuisine} />
        <ChefName name={item.name} />
        <ChefCardInfo
          img={labels.experienceImage}
          header={item.totalExperience + " years"}
          desc={labels.experienceDesc}
        />
      </div>
      <ChefProfilePic img={item.profileImg} onClick={onClickProfile} unlocked={user.menuIdsOpened.includes(menuId) || freeMenuidsOpened.includes(menuId)}/>
      {item.qualifications && (
        <div className="col-12 profile-bottom">
          <div className="row">
            {item.qualifications[0] && (
              <ChefCardInfo
                img={
                  item.qualifications[0].collegeLogo
                    ? item.qualifications[0].collegeLogo
                    : "images/ihm.png"
                }
                header={item.qualifications[0].college + ", " + item.qualifications[0].collegeCity}
                desc={item.qualifications[0].degree}
                additionalClasses={"col-12"}
              />
            )}
            {item.qualifications[1] && (
              <ChefCardInfo
                img={
                  item.qualifications[1].collegeLogo
                    ? item.qualifications[1].collegeLogo
                    : "images/ihm.png"
                }
                header={item.qualifications[1].college + ", " + item.qualifications[1].collegeCity}
                desc={item.qualifications[1].degree}
                additionalClasses={"col-12"}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefCardProfile;
