import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../BottomBar";
import EarlyUsers from "./EarlyUsers";
import { UserProfle, UserProfleBg } from "./styled";
import ReactGA from "react-ga4";
import UserAccountDescription from "./UserAccountDescription";
import ReferralCode from "./ReferralCode";
import { bottomBarActions } from "../../store/bottomBarSlice";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // ReactGA.send({ hitType: "pageview", page: "/profile" });
    ReactGA.event({
      category: "tab",
      action: "profile",
    });
  }, []);
  const user = useSelector(({ auth }) => auth.user);

  const switchTab = (tabName) => {
    dispatch(bottomBarActions.loadTab({ tabName: tabName }));
  };

  return (
    <UserProfle>
      <UserProfleBg>
        <div className="profile-heading">
          <p className="full-name">{user.username}</p>
          {/* <p className="edit-profile-text" onClick={() => switchTab('editUser')}>Edit</p> */}
        </div>
        {user.phonenumber && (
          <p className="mobile-number">{user.phonenumber}</p>
        )}
        {user.email && <p className="email-address">&bull; {user.email}</p>}
      </UserProfleBg>
      <div>
        {/* <EarlyUsers /> */}
        <UserAccountDescription />
        {/* <ReferralCode /> */}
      </div>
      <BottomBar />
    </UserProfle>
  );
};

export default Profile;
