import React, { Suspense, useEffect } from "react";
import Stories from "react-insta-stories";
import StoriesLoader from "./StoriesLoader";
import Story from "./Story";

const TryingStories = () => {
  const stories1 = [
    "https://cuirato-images.s3.ap-south-1.amazonaws.com/food/poached%20egg.jpeg",
    "https://cuirato-images.s3.ap-south-1.amazonaws.com/food/poached%20egg.jpeg",
    "https://cuirato-images.s3.ap-south-1.amazonaws.com/food/poached%20egg.jpeg",
  ];

  const OnTap = (action, isPaused) => {
    useEffect(() => {
      isPaused ? action("play") : action("pause");
    }, []);
  };

  const ContentFn = (action, isPaused) => {
    // useEffect(() => {
    //   setTimeout(() => {
    //     action("pause");
    //     setTimeout(() => {
    //       action("play");
    //     }, 2000);
    //   }, 2000);
    // }, []);
    return (
      // <Story
      //   id={"abc"}
      //   name={"dish name"}
      //   img={
      //     "https://cuirato-images.s3.ap-south-1.amazonaws.com/food/poached%20egg.jpeg"
      //   }
      //   headers={stories1}
      //   activeHeader={"header name"}
      //   categoryImg={
      //     "https://cuirato-images.s3.ap-south-1.amazonaws.com/food/poached%20egg.jpeg"
      //   }
      //   OnTap={OnTap}
      // />

        <div onClick={OnTap(action, isPaused)} style={{ background: "pink", padding: 20 }}>
          <h1 style={{ marginTop: "100%", marginBottom: 0 }}>🌝</h1>
          <h1>{isPaused ? "Paused" : "Playing"}</h1>
        </div>
    );
  };

  const stories = [
    // "https://cuirato-images.s3.ap-south-1.amazonaws.com/food/poached%20egg.jpeg",
    {
      content: ({ action, isPaused }) => ContentFn(action, isPaused),
    },
  ];

  return (
    <Suspense fallback={<StoriesLoader />}>
      <Stories stories={stories} onAllStoriesEnd={() => alert("all stories end called.")} />
    </Suspense>
  );
};

export default TryingStories;
