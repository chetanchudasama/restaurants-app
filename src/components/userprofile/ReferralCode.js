import { Suspense, useState } from "react";
import ImageLoader from "../chef/ImageLoader";
import { SuspenseImg } from "../util/SuspendImg";
import { ReferralCodeBoxWrapper } from "./styled";
import cartBg from "../../assets/referralCode.png";
import { useSelector } from "react-redux";

const ReferralCode = () => {
  const user = useSelector(({ auth }) => auth.user);
  const [isCopiedReferralCode, setIsCopiedReferralCode] = useState(false);

  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          title: "Cuirato Referral Invite",
          text: "Hey! Here's an exclusive code to join Cuirato. Pre-Order dishes now!",
          url: "https://beta.cuirato.com/",
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  const appendLine = (text, newLine, indent, bold) => {
    let msg = "";

    if (newLine === true) msg = msg.concat("\r\n");

    if (indent === true) msg = msg.concat("\t");

    if (bold === true) msg = msg.concat("*" + text + "* ");
    else msg = msg.concat(text);

    return msg;
  };

  // send default message on whatsapp
  const defaultWhatsMessage = () => {
    let msg = "";
    msg = msg.concat(appendLine("Heading Title", true, false, true));
    msg = msg.concat(appendLine("description", true, true, false));

    let url = "https://wa.me/+919016046068?text=" + msg;
    url = window.encodeURI(url);
    window.open(url, "_blank");
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setIsCopiedReferralCode(true);
  };

  return (
    <ReferralCodeBoxWrapper>
      <Suspense fallback={<ImageLoader className="loader_wrapper" />}>
        <div className="referral-code-image">
          <div>
            <SuspenseImg src={cartBg}></SuspenseImg>{" "}
          </div>
        </div>
      </Suspense>
      <div className="referral-info-text">
        <b>Refer your friends, Get 1 dish per referral</b>
      </div>
      <div className="referral-code-container">
        <p>Share your code</p>
        <div className="referral-code-box">
          <b> {user.referralCode} </b>
          <button onClick={copyReferralCode} type="button" className="copy-btn">
            <img src="./images/copy.png" alt="" />
          </button>
        </div>
        <p>{isCopiedReferralCode ? "Referral code copied" : ""}</p>
      </div>
      <div className="referral-code-info">
        <div className="referral-info-text">
          <b>Know more:</b>
        </div>
        <p>
        Cuirato is currently accessible to people with a referral code. This makes sure we keep the community closed and relevant. You can make additions to the community by inviting your friends who share your interest in food.
        </p>
        <br/>
        <p>For every member you refer, you get to -</p>
        <ol>
          <li>Unlock 1 more chef’s menu</li>
          <li>Check discounted prices for 10 more dishes</li>
          <li>Pre-order 1 more dish [up to 3 members]</li>
          <li>Get 1 free dish up to ₹250 with 1 year expiry from the day we launch. (for every member after 3 members)</li>
        </ol>
      </div>
      <div className="invite-friend-container">
        <div className="invite-friend-box">
          <button
            onClick={handleShareButton}
            type="button"
            className="btn btn-invite-friend"
          >
            <p> Invite </p>
          </button>
        </div>
      </div>
    </ReferralCodeBoxWrapper>
  );
};

export default ReferralCode;
