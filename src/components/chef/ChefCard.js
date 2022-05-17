import React from "react";
import ChefCardInfoSlider from "./ChefCardInfoSlider";
import ChefCardProfile from "./ChefCardProfile";
import ChefCardSlider from "./ChefCardSlider";
import ChefMenuCategorySlider from "./ChefMenuCategorySlider";
import MenuButton from "./MenuButton";

const ChefCard = (props) => {
  const labels = {
    experienceDesc: "Total experience",
    qualificationLabel: "Educational Qualification",
    experienceImage: "images/experiance.svg",
  };
  let chefProfileDetails = props.details;

  const experienceDetails = chefProfileDetails.pastExperiences.map((exp) => {
    let year = exp.years > 1 ? " years" : " year"
    return {
      img: exp.brandImg,
      header: exp.brandName,
      desc: exp.city + ", " + Math.ceil(exp.years) + year,
    };
  });

  return (
    <ChefCardSlider>
      <div className="profile-organization">
        <ChefCardProfile item={chefProfileDetails} labels={labels} />
        <ChefCardInfoSlider
          header="Professional Experience"
          items={experienceDetails}
          scrollerBind={props.scrollerBind}
        />
      </div>
      <div className="menu-action">
      <ChefMenuCategorySlider
        header="Menu Highlights"
        id={chefProfileDetails._id}
        scrollerBind={props.scrollerBind}
      />
      <MenuButton
        img="images/icon-menu.svg"
        alt="menu"
        title="Explore Menu"
        chefId={chefProfileDetails._id}
      />
      </div>
    </ChefCardSlider>
  );
};

export default ChefCard;
