import React, { Suspense, useEffect, useRef } from "react";
import AppContainer from "../util/AppContainer";
import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import Stories from "react-insta-stories";
import SwiperCore, { EffectCoverflow } from "swiper/core";
import StoriesLoader from "./StoriesLoader";
import "./story.css";
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./swiper.css";
import { S3_FOOD_FOLDER } from "../../store/constants";
import ReactGA from "react-ga4";

SwiperCore.use([EffectCoverflow]);

const DishStories = (props) => {

  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/stories" });
    ReactGA.event({
      category: "tab",
      action: "stories",
    });
  }, []);

  const singleRef = useRef();

  const SwiperContent = (dish = {}, dishes, index, categoryName, categoryImg) => {
    let headers = dishes.map((dish) => dish.name);
    let dishStories = (isActive) => dish.stories.filter(({ img }) => img).map((story) => ({
      content: ({ action }) => {
        action("pause");
        if (isActive) action("play");
        return (<Story
          id={story._id}
          name={categoryName}
          img={S3_FOOD_FOLDER + story.img}
          headers={headers}
          categoryImg={categoryImg}
          dish={dish}
        />)
      }
    }));
    const onAllStoriesEndSingle = () => {
      singleRef.current.swiper.slideNext();
    }
    return (
      <SwiperSlide tabIndex={index} key={index}>
        {({ isActive }) => (
          <Suspense fallback={<StoriesLoader />}>
            <Stories
              onAllStoriesEnd={onAllStoriesEndSingle}
              stories={dishStories(isActive)} />
          </Suspense>
        )}
      </SwiperSlide>
    );
  }

  return (
    <AppContainer id={props.id}>
      {/* <Swiper direction={"vertical"}> */}
      {/* <SwiperSlide> */}
      <div className="sess">
        <Swiper loop={true} ref={singleRef} effect={"coverflow"}>
          {props.dishes?.map((dish, index) => SwiperContent(dish, props.dishes, index, props.name, props.headerImg))}
        </Swiper>
      </div>
      {/* </SwiperSlide>
        {props.categories.map((category) => {
          return (
            <SwiperSlide>
              <Swiper ref={(ele) => console.log(ele)} effect={"coverflow"} >
                {category.dishes.map((dish) => {
                  let headers = category.dishes.map((dish) => dish.name);
                  let categoryStories = (isActive) => dish.stories.filter(({ img }) => img).map((story) => ({
                    content: ({ action }) => {
                      action("pause");
                      if (isActive) action("play");
                      return (
                        <Story
                          id={story._id}
                          name={category.name}
                          img={S3_FOOD_FOLDER + story.img}
                          headers={headers}
                          activeHeader={dish.name}
                        />
                      );
                    }
                  }));
                  return (
                    <SwiperSlide>
                      {({ isActive }) => (
                        <Suspense fallback={<StoriesLoader />}>
                          <Stories stories={categoryStories(isActive)} />
                        </Suspense>
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </AppContainer>
  );
};

export default DishStories;

// const stories = Array.from(
//   headers.map((header) => {
//     return {
//       content: ({ action, isPaused }) => {
//         return (
//           <Story
//             img={header.img}
//             headers={headers}
//             activeHeader={header.name}
//             action={action}
//             isPaused={isPaused}
//           />
//         );
//       },
//     };
//   })
// );

// {
/* <Stories
        keyboardNavigation
        stories={stories}
        width={"100%"}
        height={"100%"}
      /> */
// }

// {
/* <Suspense fallback={<StoriesLoader></StoriesLoader>}>
      <Stories
        keyboardNavigation
        stories={stories}
        width={"100%"}
        height={"100%"}
        isPaused={true}
        loader={
          <AppContainer>
            <p>loading...</p>
          </AppContainer>
        }
      />
    </Suspense> */
// }