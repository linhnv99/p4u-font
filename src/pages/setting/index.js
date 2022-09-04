import React, { useRef } from "react";
import { getErrorMessage } from "../../errors";
import { AccountSetting } from "./accountSetting";
import { ProfileSetting } from "./profileSetting";
import { useAxios } from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";
import API from "../../api";
import Toaster from "../../utils/toaster";

import "./index.css";

function Setting({ location: { hash } }) {
  const accountLocationRef = useRef();
  const profileLocationRef = useRef();
  const { loading, error, data: user } = useAxios(API.getProfile());

  const handleScrollTo = (ref) => {
    const offsetNav = document.getElementById("settings");
    window.scroll({
      top: ref.current?.offsetTop - offsetNav.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  if (error) {
    Toaster.error(getErrorMessage(error.data.code));
    return;
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="main-content px-3 px-lg-2 ">
      <div className="settings clearfix" id="settings">
        <div className="settings-left-content d-none d-md-block">
          <ul className="content">
            <li className={`${hash === "#account" ? "active" : ""}`}>
              <a
                href="#account"
                onClick={() => handleScrollTo(accountLocationRef)}
              >
                Tài khoản
                <i className="fas fa-angle-right float-end"></i>
              </a>
            </li>
            <li className={`${hash === "#profiles" ? "active" : ""}`}>
              <a
                href="#profiles"
                onClick={() => handleScrollTo(profileLocationRef)}
              >
                Hồ sơ cá nhân
                <i className="fas fa-angle-right float-end"></i>
              </a>
            </li>
            <li className={`${hash === "#notification" ? "active" : ""}`}>
              <a href="#notification">
                Thông báo
                <i className="fas fa-angle-right float-end"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="settings-right-content float-end">
          <AccountSetting user={user} ref={accountLocationRef} />
          <ProfileSetting user={user} ref={profileLocationRef} />
        </div>
      </div>
    </div>
  );
}

export default Setting;
