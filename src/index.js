import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import App from "./App";
import store from "./store/index"

import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { API_TEST } from "./store/constants";

axios.defaults.baseURL = API_TEST

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
