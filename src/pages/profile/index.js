import React, { useRef } from "react";
import { getErrorMessage } from "../../errors";
import { useAxios } from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";
import API from "../../api";
import Toaster from "../../utils/toaster";
import Avatar from "../../components/Avatar";

function Profile() {
  const { loading, error, data: user } = useAxios(API.getProfile());

  if (error) {
    Toaster.error(getErrorMessage(error.data.code));
    return;
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="main-content">
      <div className="profile">
        <div className="header">
          <ul>
            <li>
              <div className="avatar">
                <Avatar
                  width={156}
                  height={156}
                  className="rounded-circle avt me-3"
                  avatarPath={user.avatar}
                />
              </div>
            </li>
            <li>
              <h3>{user.name}</h3>
            </li>
            <li>
              <p>@{user.username}</p>
            </li>
            <li>
              <div className="follows mt-1 mb-2">
                <a href="">0 Followers</a>
                <a href="">90.000 Followings</a>
              </div>
            </li>
            <li>
              <button>Edit profile</button>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="container">
            <div className="nav">
              <button className="selected">Created</button>
              <button>Saved</button>
            </div>
            <div className="collections">
              <div className="row">
                <div className="col-12 col-md-3">
                  <div className="item">
                    <img
                      className="img-fluid"
                      src="https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg"
                    />
                    <div className="thumbs"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
