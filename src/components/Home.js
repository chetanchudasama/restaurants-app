import Banners from "./banner/Banners";
import ChefCards from "./chef/ChefCards";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import AppContainer from "./util/AppContainer";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import mixpanel from 'mixpanel-browser';
import { useDispatch, useSelector } from "react-redux";
import Joyride, { STATUS } from "react-joyride";
import { loginActions } from "../store/loginSlice";

// TODO: replace the step object in global level 
const steps = [
  // {
  //   content: <h5>Let's begin our journey!</h5>,
  //   locale: { skip: <strong aria-label="skip">Skip</strong> },
  //   placement: "center",
  //   target: "body",
  // },
  {
    title : 'Hold and Swipe',
    content: 'Stop scrolling endlessly, these chefs deserve your attention!',
    spotlightPadding: 0,
    target: ".section-slider-wrapper",
    disableBeacon : true,
  },
  {
    title: 'Banners',
    content: 'Read important information and announcements. Get the best deals!',
    floaterProps: {
      disableAnimation: true,
    },
    disableBeacon : true,
    spotlightPadding: 0,
    target: ".slick-list",
  },
  {
    title: 'Chef profile',
    content: 'Professionally trained and experienced to get your food right every single time.',
    spotlightPadding: 25,
    target: ".profile-organization",
  },
  {
    title : 'Chef’s Menu',
    content: 'Check their menu stories or explore the detailed menu.',
    spotlightPadding: 25,
    target: ".menu-action",
    locale: { 
      last: 'Done',
      next : ''
    },
    showProgress : 'false'
  },
];

const Home = (props) => {
  const dispatch = useDispatch();
  const [run, setRun] = useState(false);
  let tourGuid = useSelector((state) => state.auth.tourState);
  const user = useSelector(({ auth }) => auth.user);
  const [autoSwipe, setAutoSwipe] = useState(false);

  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/home" });
    ReactGA.event({
      category: "tab",
      action: "home",
    });

    mixpanel.track('home');
  }, []);

  useEffect(() => {
    setTimeout(() => {
    if (!tourGuid) {
        setRun(true);
      }
    }, 5000)
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      dispatch(loginActions.setTourState());
      setRun(false);
    }
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
   
    if(data.index == 2){
      const content = document.querySelector(".cuisine-slider");
      const contentwidth = content.offsetWidth;
      setTimeout(() => {
        content.scrollLeft = contentwidth;
      }, 500);
    }
    if(data.index == 3){
      setAutoSwipe(true);
    }
  };

  return (
    <AppContainer id={props.id}>
      <TopBar />
      <Banners />
      <ChefCards autoSwipe={autoSwipe} />
      <BottomBar />
      <Joyride
        callback={handleJoyrideCallback}
        continuous={true}
        run={run}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={false}
        steps={steps}
        disableOverlay={false}
        hideBackButton = {true}
        styles={{
          options: {
            primaryColor: "#e8814d",
            zIndex: 10000,
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.8)',
          },
          tooltipTitle: {
            fontSize: 16,
            margin: '0 0 0px 0',
            textAlign : 'left',
            paddingLeft : '10px',
            color : 'rgb(103 0 0)'
          },
          tooltipContent: {
            fontSize: 13,
            padding: '10px 10px',
            textAlign : 'left',
            fontWeight : 300,
            color : 'grey'
          },
          buttonNext : {
            fontSize : '13px'
          }
        }}
        
      />
    </AppContainer>
  );
};

export default Home;
