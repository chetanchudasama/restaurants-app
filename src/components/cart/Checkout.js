import React, { Suspense, useEffect, useState, useRef } from "react";
import ImageLoader from "../chef/ImageLoader";
import "../login/login.css";
import AppContainer from "../util/AppContainer";
import { SuspenseImg } from "../util/SuspendImg";
import mainImage from "../../assets/loginTheme.png";
import MenuTopBar from "../menu/MenuTopBar";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../../store/loginActions";
import { bottomBarActions } from "../../store/bottomBarSlice";
import ReactGA from "react-ga4";
// Import React Scrit Libraray to load Google object
import Script from "react-load-script";
import { ORDER_DISTANCE_RANGE } from "../../store/constants";

const CITY_NAME = "mumbai";

const Checkout = (props) => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { cartData, isLoading } = useSelector(({ cart }) => cart);
  const [loginState, setLoginState] = useState({
    email: "",
    area: "",
  });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorMessageForDelivery, setErrorMessageForDelivery] = useState("");
  const sourceLocation = {
    latitude: 19.134069,
    longitude: 72.83036,
  };

  // Store autocomplete object in a ref.
  // This is done because refs do not trigger a re-render when changed.
  const autocompleteRef = useRef(null);

  
  const handleScriptLoad = () => {
    const options = {
      fields: ["formatted_address", "geometry", "name", "address_component"],
      strictBounds: false,
      types: ["establishment"],
    };
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("searchAutoComplete"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    // Fire Event when a suggested name is selected
    autocompleteRef.current.addListener("place_changed", function () {
      const addressObject = autocompleteRef.current.getPlace();
      let components = addressObject.address_components,
        city = "n/a";
      if (components) {
        for (let c = 0; c < components.length; ++c) {
          console.log(components[c].types.join("|"));
          if (
            components[c].types.indexOf("locality") > -1 &&
            components[c].types.indexOf("political") > -1
          ) {
            city = components[c].long_name;
            break;
          }
        }
      }

      if (addressObject && addressObject.geometry) {
        const locationObject = {
          lat: addressObject.geometry.location.lat(),
          lng: addressObject.geometry.location.lng(),
          area : addressObject.formatted_address,
        };
        setLocation(locationObject);
      }

      setCity(city);
      setQuery(addressObject ? addressObject.formatted_address : "");
    });
  };

  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/checkout" });
    ReactGA.event({
      category: "tab",
      action: "checkout",
    });
  }, []);

  const checkoutCart = () => {
    if (loginState.email && loginState.area) {
      setErrorMessageForDelivery("");
      setError(false);
      const distanceValue = distance(
        sourceLocation.latitude,
        sourceLocation.longitude,
        location.lat,
        location.lng,
        "K"
      );
      if (city.toLowerCase() !== CITY_NAME) {
        setErrorMessageForDelivery("Available only Mumbai city");
        return
      }
      if (distanceValue > ORDER_DISTANCE_RANGE) {
        setErrorMessageForDelivery("Service will not be available");
        return;
      }
      dispatch(checkout(cartData, user, loginState.email, loginState.email, location));
    } else {
      if (!loginState.email) {
        setError(true);
        setErrorText("Email id is required");
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginState.email)
      ) {
        setError(true);
        setErrorText("Email id is not valid");
      } else if (!loginState.area) {
        setError(true);
        setErrorText("address is required");
      }
    }
  };

  const switchTab = (tabName) => {
    dispatch(bottomBarActions.loadTab({ tabName: tabName }));
  };

  // This function calculate the distance between two end point
  const distance = (
    sourceLat,
    sourceLon,
    destinationLat,
    destinationLon,
    unit
  ) => {
    if (sourceLat == destinationLat && sourceLon == destinationLon) {
      return 0;
    } else {
      var radlat1 = (Math.PI * sourceLat) / 180;
      var radlat2 = (Math.PI * destinationLat) / 180;
      var theta = sourceLon - destinationLon;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  };

  const onBackClick = () => {
    switchTab("cart");
  };
  return (
    <AppContainer id={props.id}>
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSrNgyDHSkqDzUMNIJEbsLt3u_q1RbjYw&libraries=places"
        onLoad={handleScriptLoad}
      />
      <div className="cart-top-bar">
        <MenuTopBar
          name="Checkout"
          cuisine="Pre Booking"
          notMenu={true}
          onBackClick={onBackClick}
        />
      </div>
      <div className="login-container">
        <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
          <div className="mt">
            <SuspenseImg src={mainImage}></SuspenseImg>{" "}
          </div>
        </Suspense>
        <div className="logo-container">
          <h2>Checkout</h2>
          <p>
            We will update you when your preferred chefs go live.
            <br /> You will be able schedule your delivery through the app.
            <br />
          </p>
        </div>
        <div className={error ? "" : "hide"}>
          <p className="error-msg">{errorText}</p>
        </div>
        <div className="login-input">
          <input
            type="text"
            className="login-phone input-text"
            name="email"
            onChange={({ target }) =>
              setLoginState({
                ...loginState,
                [target.name]: target.value,
              })
            }
            placeholder="Email"
            value={loginState.email}
          />
        </div>
        <div className="login-input">
          <input
            id="searchAutoComplete"
            type="text"
            className="login-phone"
            name="area"
            onChange={({ target }) => {
              setQuery("");
              setLoginState({
                ...loginState,
                [target.name]: target.value,
              });
            }}
            placeholder="Address"
            value={query ? query : loginState.area}
          />
          <b> {errorMessageForDelivery} </b>
        </div>
        <div
          className="checkout-option active"
          id="cart_option"
          onClick={() => checkoutCart()}
        >
          <div className="bottom-button">
            <p>Book</p>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default Checkout;
