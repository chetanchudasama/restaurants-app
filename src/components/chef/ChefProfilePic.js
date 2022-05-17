import React from "react";
import "./chef-cards.css";


const ChefProfilePic = ({ onClick, img, unlocked }) => {
  console.log(unlocked)
  return (
    <div onClick={onClick} className="profile-right">
      <figure className="profile-figure">
      <img className="lock-icon" src={unlocked ? "images/Icons/Icon-05.svg"  : "images/Icons/Icon-04.svg" } alt="" />
        <span className="img-ring-red">
          <img src={img} alt="profile image" />
        </span>
      </figure>
    </div>
  );
};

export default ChefProfilePic;
