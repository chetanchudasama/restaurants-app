import React from "react";
import { Spinner } from "react-bootstrap";

const ImageLoader = (props) => (
  <Spinner animation="border" role="status" {...props} />
);

export default ImageLoader;
