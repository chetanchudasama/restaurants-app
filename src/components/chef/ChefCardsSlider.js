import React, { useState, useEffect, useRef, Suspense } from "react";
import ChefCard from "./ChefCard";
import Slider from "react-slick";
import { useSwipeable } from "react-swipeable";
import { useLongPress } from "use-long-press";
import ChefCardLoader from "./ChefCardLoader";
import Instruction from "../util/Instruction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { current } from "immer";
//toast.configure();

const ChefCardsSlider = (props) => {
  let longPress = false;
  let scrollerClicked = false;
  let [showInstruction, setShowInstruction] = useState(false);
  let cuiratoInstructionDismissed =
    localStorage.getItem("cuirato-instruction-dismissed") === "true";
  let [lastSlide, setLastSlide] = useState(false);
  const bind = useLongPress(
    () => {
      if (!scrollerClicked) {
        document.body.classList.add("prevent-scroll");
        document
          .getElementsByClassName("slick-current")[1]
          .classList.add("pressed");
        longPress = true;
        console.log("use-long-press: Long pressed!");
      }
    },
    {
      onStart: (event) => {
        console.log("Press started");
      },
      onFinish: (event) => {
        if (!scrollerClicked) {
          document.body.classList.remove("prevent-scroll");
          document
            .getElementsByClassName("slick-current")[1]
            .classList.remove("pressed");
          longPress = false;
          console.log("Long press finished");
        }
      },
      threshold: 400,
    }
  );

  const scrollerBind = useLongPress(() => {}, {
    onStart: (event) => {
      scrollerClicked = true;
      console.log("scoller pressed");
    },
    onCancel: (event) => {
      scrollerClicked = false;
      console.log("scoller released");
    },
    onFinish: (event) => {
      scrollerClicked = false;
      console.log("scoller released");
    },
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (longPress) {
        slideRef.current.slickNext();
      }
    },
    onSwipedRight: () => {
      if (longPress) {
        slideRef.current.slickPrev();
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 50, //control swipe length
  });

  const setInstructuionTimer = () => {
    if (!cuiratoInstructionDismissed) {
      setTimeout(function () {
        if (!cuiratoInstructionDismissed) setShowInstruction(true);
      }, 5000);
    }
  };

  const isMobileDevice = () => {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
    containing some mobile devices keywords 
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    let isMobileDevice = regexp.test(details);
    return isMobileDevice;
  };

  const slideRef = useRef();

  const settings = {
    centerMode: true,
    centerPadding: "11%",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    mobileFirst: true,
    pauseOnHover: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: false,
    draggable: true,
    accessibility: false,
    arrows: false,
    adaptiveHeight: false,
    variableWidht: false,
    infinite: false,
    useTransform: true,
    trasition: "ease-in-out",
    beforeChange: (current, next) => {
      if (current == next)
        toast.info("You've reached the end of the list.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
    },
  };

  const onDismiss = () => {
    setShowInstruction(false);
    cuiratoInstructionDismissed = false;
    localStorage.setItem("cuirato-instruction-dismissed", true);
  };

  const autoSwipe = () => {
    //setShowInstruction(true);
    document
      .getElementsByClassName("slick-current")[1]
      .classList.add("pressed");
    slideRef.current.slickNext();
  };

  useEffect(() => {
    //setInstructuionTimer();

    const noContext = document.getElementsByClassName("swipehere");

    noContext[0].addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }, []);

  useEffect(() => {
    if(props.autoSwipe){
      autoSwipe();
    }
  }, [props.autoSwipe]);

  return (
    <div className="swipehere" {...handlers} {...bind}>
      {isMobileDevice() && showInstruction && (
        <Instruction onDismiss={onDismiss} />
      )}
      <Slider {...settings} ref={slideRef}>
        {props.chefListLoaded ? (
          props.chefList.map((chef, index) => (
            <Suspense key={index} fallback={<ChefCardLoader />}>
              <ChefCard
                id={"s" + index}
                details={chef}
                scrollerBind={scrollerBind}
              />
            </Suspense>
          ))
        ) : (
          <ChefCardLoader />
        )}
      </Slider>
      <ToastContainer />
    </div>
  );
};

export default ChefCardsSlider;
