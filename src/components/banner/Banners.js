import React, { Suspense } from "react";
import Banner from "./Banner";
import BannerWrapper from "./BannerWrapper";
import Slider from "react-slick";

const Banners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <BannerWrapper>
      <Slider {...settings}>
        <Banner src="images/banner-intro.jpg" />
        <Banner src="images/banner-kitchen.jpg" />
        <Banner src="images/banner-order.jpg" />
      </Slider>
    </BannerWrapper>
  );
};

export default Banners;
