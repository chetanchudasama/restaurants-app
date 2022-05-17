import React, { useState, Suspense, lazy, useEffect } from "react";
import AppContainer from "../util/AppContainer";
import BottomBar from "../BottomBar";
import OtpInput from "react-otp-input";
import "./login.css";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  updateName,
  updateReferral,
  sendOTP,
  login,
  addWaitingList,
} from "../../store/loginActions";
import EarlyUsers from "../userprofile/EarlyUsers";
import { PopBenifits } from "../userprofile/styled";
import CloseIcon from "../../assets/close.png";
import mainImage from "../../assets/loginTheme.png";
import { SuspenseImg } from "../util/SuspendImg";
import ImageLoader from "../chef/ImageLoader";
import { chefActions } from "../../store/chefSlice";
import { bottomBarActions } from "../../store/bottomBarSlice";
import ReactGA from "react-ga4";
import { useReadOTP } from "react-read-otp";

import Banner from "../banner/Banner";
import BannerWrapper from "../banner/BannerWrapper";
import Slider from "react-slick";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import mixpanel from 'mixpanel-browser';

const Login = (props) => {
  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/login" });
    ReactGA.event({
      category: "tab",
      action: "login",
    });
    mixpanel.track('login');
  }, []);
  const dispatch = useDispatch();
  const getName = useSelector((state) => state.auth.getName);
  const getReferral = useSelector((state) => state.auth.getReferral);
  const user = useSelector((state) => state.auth.user);
  const menuOpens = useSelector((state) => state.auth.freeMenuOpens);
  const menuIdsOpened = useSelector((state) => state.auth.freeMenuidsOpened);
  const [UserBenefits, setUserBenefits] = useState(props.showBenefits);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loginState, setLoginState] = useState({
    name: "",
    phoneNumber: user ? user.phonenumber : "",
    referral: "",
    otp: "",
    onOtpSend: false,
  });
  const [otpValue, setOtpValue] = useState("");
  // useReadOTP(setOtpValue);
  const [enabled, setEnabled] = useState(false);
  const [otp, setOTP] = useState("");
  const [isShownValue, setIsShownValue] = useState("no Value");
  const [stepperIndex, setStepperIndex] = useState(
    props.activeStepper ? props.activeStepper : 1
  );
  //const bottombardisplay = useSelector((state) => state.bottomBar.bottombardisplay);
  const [waitingList, setWaitingList] = useState(false);
  const waitListSuccess = useSelector((state) => state.auth.waitListSuccess);

  useReadOTP(
    (otp) => {
      setIsShownValue("Method is called");
      setOTP(otp);
    },
    {
      enabled,
    }
  );

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

  const register = () => {
    const { name, phoneNumber, referral } = loginState;
    //add validations, handle signup api
    if (loginState.name && loginState.referral) {
      setError(false);
      dispatch(
        loginAction({ name, phoneNumber, referral, menuOpens, menuIdsOpened }, setError)
      );
    } else {
      if (!loginState.name) {
        setError(true);
        setErrorText("Your name is required");
      } else if (!loginState.referral) {
        setError(true);
        setErrorText("Only people with a Referral code can register");
      }
    }
  };

  const doLogin = () => {
    const { phoneNumber, otp, onOtpSend } = loginState;
    if (
      phoneNumber.length === 10 &&
      otpValue.length === 4 &&
      //Number(otpValue) === otp &&
      onOtpSend
    ) {
      dispatch(login({ phoneNumber, menuOpens, menuIdsOpened }));
      mixpanel.track("otp_proceed_clicked");
    }
  };

  const updateNameInUser = () => {
    dispatch(updateName(user, loginState.name));
  };

  const updateReferralInUser = () => {
    // api needs to return user, function doesn't work.
    const { name, phoneNumber, referral } = loginState;
    let user = { name, phoneNumber, referral, menuOpens, menuIdsOpened };
    dispatch(updateReferral(user, loginState.referral));
  };

  const closeOTPPopup = () => {
    setLoginState({ ...loginState, onOtpSend: false });
  };

  function setOtpSent() {
    if (loginState.phoneNumber.length === 10) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      setLoginState({ ...loginState, otp, onOtpSend: true });
      setError(false);
      // get country mobile code
      const mobileNumber = "91" + loginState.phoneNumber;
      //call sms-otp api
      dispatch(sendOTP({ mobileNumber, otp }));
      setEnabled(true);
      return true;
    } else if (loginState.phoneNumber.length !== 10) {
      setError(true);
      setErrorText("Phone number should be 10 characters");
      return false;
    }
  }

  const handleNextStepper = (currentOpenedIndex) => {
    switch (currentOpenedIndex) {
      case 1:
        setStepperIndex((prevIndex) => prevIndex + 1);
        return;
      case 2:
        let success = setOtpSent();
        if(success) setStepperIndex(5);
        mixpanel.track("send_otp_clicked");
        return;
      case 3:
        setStepperIndex((prevIndex) => prevIndex + 1);
        return;
      default:
        break;
    }
  };

  const goToLogin = (step) => {
    setWaitingList(false);
    handleNextStepper(step);
    mixpanel.track("login_clicked-have_referral_code");
  }
  
  const joinWaitingList = (step) => {
    setWaitingList(true);
    handleNextStepper(step);
    mixpanel.track("waiting_list_clicked-want_referral_code");
  }

  const waitingListSubmit = () => {
    dispatch(addWaitingList(loginState.phoneNumber));
    mixpanel.track("join_waiting_list_clicked-want_referral_code");
  }

  useEffect(() => {
    if (getName) {
      closeOTPPopup();
      if(stepperIndex != 4){
        setStepperIndex(3); //redirect to sign up;
      }
    }
  }, [getName]);

  useEffect(() => {
    if(getReferral){
      setError(true);
      setErrorText("You can't join without a referral code. We’ll add you to the waiting list.");
    }
  }, [getReferral]);

  const LoginWrapper = (stepper) => {
    switch (stepper) {
      case 1:
        // dispatch(
        //   bottomBarActions.changeBottombar({bottombardisplay : true})
        // );
        return (
          <>
            <div className="login-container">
              {!props.initial ? (
                <div className="back-btn-wrapper mg-10 back-banner-btn">
                  <button
                    onClick={() => {
                      onBackClick(1);
                    }}
                    type="button"
                    className="btn back-btn"
                  >
                    <img src="images/icon-back.svg" alt="back" loading="lazy" />
                  </button>
                </div>
              ) : (
                <></>
              )}
              <BannerWrapper className="banner-wrapper">
                <Slider {...settings}>
                  <div className="banner-login-slider">
                    <Banner src="images/intro-banner-1.jpg" />
                    <h2 className="container-title" align="center">
                      Order food from handpicked Cuisine experts.
                    </h2>
                    <p>
                      Currently available to members <br />
                      with an exclusive referral code.
                    </p>
                  </div>
                  <div className="banner-login-slider">
                    <Banner src="images/intro-banner-2.jpg" />
                    <h2 className="container-title" align="center">
                      A first-ever cloud kitchen
                    </h2>
                    <p>
                      {" "}
                      where only professional chefs cook to serve you <br />
                      their cuisine specialities goes live soon!
                    </p>
                  </div>
                  <div className="banner-login-slider">
                    <Banner src="images/intro-banner-3.jpg" />
                    <h2 className="container-title" align="center">
                      Unlock chef menus and <br /> pre-order dishes.
                    </h2>
                    <p>
                      The first 8 cuisine experts are available for pre-orders.
                    </p>
                  </div>
                  <div className="banner-login-slider">
                    <Banner src="images/intro-banner-4.jpg" />
                    <h2 className="container-title" align="center">
                      First come-best buy
                    </h2>
                    <p>
                      Dish prices increase as more people join and book; <br />
                      Don’t miss out on the best deals!
                    </p>
                  </div>
                </Slider>
              </BannerWrapper>

              {isMobileDevice() ? (
                <div className="banner-box">
                  <div className="button-box">
                    <a className="btn-login" onClick={() => goToLogin(1)}>
                      <span>I have a referral code</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="banner-box">
                  <div className="button-box">
                    <a className="btn-login" onClick={() => joinWaitingList(1)}>
                      <span>I want an exclusive code</span>
                    </a>
                  </div>
                </div>
              )}
              {isMobileDevice() ? (
                <div className="login-options">
                  <p onClick={() => joinWaitingList(1)}>
                    I want an exclusive code
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        );
      case 2:
        // dispatch(
        //   bottomBarActions.changeBottombar({bottombardisplay : false})
        // );
        return (
          <>
            <div className="login-section">
              <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
                <div className="mt login-box">
                  <h2 className="login-title">
                    {waitingList ? "Join Waiting list" : "Login"}
                  </h2>
                  <SuspenseImg src={mainImage}></SuspenseImg>{" "}
                  <div className="login-content pg-5">
                    <div className="back-btn-wrapper">
                      <button
                        onClick={() => onBackClick(2)}
                        type="button"
                        className="btn back-btn"
                      >
                        <img
                          src="images/icon-back.svg"
                          alt="back"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Suspense>

              <div className="form-box">
                <div>
                  <div className={error ? "" : "hide"}>
                    <p className="error-msg">{errorText}</p>
                  </div>
                  <TextField
                    selectTextOnFocus={true}
                    className="material-form-field "
                    id="standard-basic"
                    name="phoneNumber"
                    label="PHONE NUMBER"
                    type="number"
                    value={loginState.phoneNumber}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                      if (e.target.value.length == 10) {
                        e.target.blur();
                      }
                    }}
                    onChange={({ target }) => {
                      setLoginState({
                        ...loginState,
                        [target.name]: target.value,
                        otp: "",
                        onOtpSend: "",
                      });
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <div>+91</div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="button-box mt-30">
                  <a
                    className="btn-login"
                    onClick={() =>
                      waitingList ? waitingListSubmit() : handleNextStepper(2)
                    }
                  >
                    {waitingList ? <span>Join</span> : <span>Continue</span>}
                  </a>
                </div>
                <br />
                {waitListSuccess ? (
                  <span>
                    Thank you! We'll get back with an exclusive code just
                    for you.
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        );
      case 3:
        // dispatch(
        //   bottomBarActions.changeBottombar({bottombardisplay : false})
        // );
        return (
          <>
            <div className="login-section">
            <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
              <div className="login-box login-sign-up-box">
                <h2 className="login-title">Sign Up</h2>
                <SuspenseImg src={mainImage}></SuspenseImg>{" "}
                <div className="login-content pg-10">
                  {props.activeStepper === 3 && (
                    <>
                      <div className="back-btn-wrapper">
                        <button
                          onClick={() => onBackClick(3)}
                          type="button"
                          className="btn back-btn"
                        >
                          <img
                            src="images/icon-back.svg"
                            alt="back"
                            loading="lazy"
                          />
                        </button>
                      </div>
                    </>
                  )}
                  
                  {/* <p className="container-text">
                    We don't know you enough.
                  </p> */}
                </div>
              </div>
              </Suspense>

              <div className="form-box">
                <div className={error ? "" : "hide"}>
                    <p className="error-msg">{errorText}</p>
                </div>
                <div>
                  <TextField
                    autoComplete="off"
                    className="material-form-field"
                    id="standard-basic"
                    label="NAME"
                    name="name"
                    value={loginState.name}
                    onFocus={({ target }) => {setTimeout(window.scrollTo(0, 200),160)}}
                    onChange={({ target }) => {
                      setLoginState({
                        ...loginState,
                        [target.name]: target.value,
                      });
                    }}
                  />
                </div>
                <div className="mt-30">
                  <TextField
                    autoComplete="off"
                    className="material-form-field"
                    id="standard-basic"
                    label="REFERRAL CODE"
                    value={loginState.referral}
                    name="referral"
                    onFocus={({ target }) => {window.scrollTo(0, 350)}}
                    onChange={({ target }) => {
                      setLoginState({
                        ...loginState,
                        [target.name]: target.value,
                      });
                    }}
                  />
                </div>
                <div className="mt-30">
                  <TextField
                    className="material-form-field "
                    id="standard-basic"
                    label="PHONE NUMBER"
                    name="phoneNumber"
                    value={loginState.phoneNumber}
                    disabled
                    type="number"
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                      if(e.target.value.length == 10){
                        e.target.blur()
                      }
                    }}
                    onChange={({ target }) => {
                      setLoginState({
                        ...loginState,
                        [target.name]: target.value,
                      });
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <div>+91</div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="button-box mt-30" onClick={register}>
                  <a className="btn-login">
                    {/* <span>Continue</span> */}
                    <span>Create Account</span>
                  </a>
                </div>
                {/*<div className="conditions-box">
                   By clicking, I accept the <a href="">Terms &amp; Conditions </a> &amp; <a href="">Privacy Policy</a> 
                  <a href="">Have a referral code?</a>
                </div>*/}
              </div>
            </div>
          </>
        );
      case 4:
        // dispatch(
        //   bottomBarActions.changeBottombar({bottombardisplay : true})
        // );
        return (
          <>
            <div className="login-section">
              <div className="login-box edit-box">
                <img
                  className="login-bg-img"
                  src="./images/demo.jpg"
                  alt="login"
                />
                <div className="login-content pg-10">
                  {props.activeStepper === 3 && (
                    <>
                      <div className="back-btn-wrapper">
                        <button
                          onClick={() => onBackClick(3)}
                          type="button"
                          className="btn back-btn"
                        >
                          <img
                            src="images/icon-back.svg"
                            alt="back"
                            loading="lazy"
                          />
                        </button>
                      </div>
                    </>
                  )}
                  <h2 className="login-title">Edit Profile</h2>
                </div>
              </div>

              <div className="form-box">
                <div className={error ? "" : "hide"}>
                    <p className="error-msg">{errorText}</p>
                </div>
                <div>
                  <TextField
                    autoComplete="off"
                    className="material-form-field"
                    id="standard-basic"
                    label="NAME"
                    name="name"
                    value={loginState.name}
                    onFocus={({ target }) => {setTimeout(window.scrollTo(0, 200),160);}}
                    onChange={({ target }) => {
                      setLoginState({
                        ...loginState,
                        [target.name]: target.value,
                      });
                    }}
                  />
                </div>
                <div className="mt-20">
                  <TextField
                    autoComplete="off"
                    className="material-form-field"
                    id="standard-basic"
                    label="REFERRAL CODE"
                    value={loginState.referral}
                    name="referral"
                    onFocus={({ target }) => {window.scrollTo(0, 250)}}
                    onChange={({ target }) => {
                      setLoginState({
                        ...loginState,
                        [target.name]: target.value,
                      });
                    }}
                  />
                </div>
                <div className="mt-30">
                  <TextField
                    className="material-form-field "
                    id="standard-basic"
                    label="PHONE NUMBER"
                    name="phoneNumber"
                    value={loginState.phoneNumber}
                    disabled
                    type="number"
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                      if(e.target.value.length == 10){
                        e.target.blur()
                      }
                    }}
                    onChange={({ target }) => {
                      setLoginState({
                        ...loginState,
                        [target.name]: target.value,
                      });
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <div>+91</div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="button-box mt-30" onClick={register}>
                  <a className="btn-login">
                    {/* <span>Continue</span> */}
                    <span>Update Account</span>
                  </a>
                </div>
                {/*<div className="conditions-box">
                   By clicking, I accept the <a href="">Terms &amp; Conditions </a> &amp; <a href="">Privacy Policy</a> 
                  <a href="">Have a referral code?</a>
                </div>*/}
              </div>
            </div>
          </>
        );
      case 5:
        // dispatch(
        //   bottomBarActions.changeBottombar({bottombardisplay : false})
        // );
        return (
          <>
            <div className="login-section">
              <div className="login-box login-otp">
                <div className="login-content pg-10">
                  <div className="back-btn-wrapper">
                    <button
                      onClick={() => onBackClick(4)}
                      type="button"
                      className="btn back-btn"
                    >
                      <img
                        src="images/icon-back.svg"
                        alt="back"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-box">
                <div>
                  <div className={error ? "" : "hide"}>
                    <p className="error-msg">{errorText}</p>
                  </div>
              </div>

              <div className="otp-wrapper">
                <div className="otp-input">
                  <input
                    type="number"
                    value={otpValue}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
                      if(e.target.value.length == 4){
                              e.target.blur()
                      }
                    }}
                    onChange={(e) => {
                      setOtpValue(e.target.value);
                    }}
                    maxLength={4}
                    minLength={4}
                    pattern="\d{4}"
                    autoFocus
                  />
                </div>
                <p className="enter-otp-msg">
                  Enter the 4-digit code <br/> sent on your phone via SMS
                </p>
                {/* <h1>{isShownValue}</h1>
                <input placeholder="Enter otp" value={otp} onChange={e => setOTP(e.target.value)} /> */}
                <div className="button-panel" onClick={doLogin}>
                  <div className={"proceed-btn " + (otpValue.toString().length != 4 ? 'disabled' : '')}>
                    <p className="button-text">PROCEED</p>
                    <div className="img-box">
                      <img src="images/right-arrow.png" />
                    </div>
                  </div>
                </div>
                <div className="resend_otp-wrapper">
                  <a className="resend-otp" onClick={() => setOtpSent()}>
                    <span>Resend OTP</span>
                  </a>
                </div>
              </div>
            </div>
            </div>
          </>
        );
      default:
        return;
    }
  };

  const onBackClick = (currentOpenedIndex) => {
    switch (currentOpenedIndex) {
      case 1:
        dispatch(bottomBarActions.loadTab({ tabName: "chef" }));
        return;
      case 2:
        setStepperIndex((prevIndex) => prevIndex - 1);
        return;
      case 3:
        if (props.activeStepper) {
          dispatch(bottomBarActions.loadTab({ tabName: "profile" }));
          return;
        }
        setStepperIndex((prevIndex) => prevIndex - 1);
        return;
      case 4:
        setStepperIndex(2);
        return;
      default:
        return;
    }
    // dispatch(bottomBarActions.loadTab({ tabName: "chef" }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <AppContainer id={props.id}>
      {LoginWrapper(stepperIndex)}
      <div className="login-options">
        <p onClick={() => setUserBenefits(!UserBenefits)}>
          Early user benefits
        </p>
      </div>
      {UserBenefits && (
        <PopBenifits>
          <div className="modal-top-section">
            <div onClick={() => setUserBenefits(false)} className="colse-btn">
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
          </div>
          <EarlyUsers notLoggedIn={true} />
        </PopBenifits>
      )}
      {!props.initial ? <BottomBar /> : <></>}
    </AppContainer>
  );
};

export default Login;
