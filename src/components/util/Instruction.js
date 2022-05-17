import React, { Suspense } from "react";
import ImageLoader from "../chef/ImageLoader";
import "./instruction.css";
import { SuspenseImg } from "./SuspendImg";

const Instruction = (props) => {
  return (
    <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
      <SuspenseImg
        className="long-press-swipe"
        alt=""
        src="images/hold-and-swipe-temp.gif"
      />
      <div
        className="instruction-dismiss-btn colse-btn"
        onClick={props.onDismiss}
      >
        <img src="/static/media/close.d4a76e94.png" alt="CloseIcon" />
      </div>
    </Suspense>
  );
};

export default Instruction;
