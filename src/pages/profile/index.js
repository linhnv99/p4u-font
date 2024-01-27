import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getErrorMessage } from "../../errors";
import { useAxios } from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";
import API from "../../api";
import Toaster from "../../utils/toaster";
import Avatar from "../../components/Avatar";
import Router from "../../routes/router";
import services from "../../api/services";

function Profile() {
  const history = useHistory();
  const { loading, error, data: user } = useAxios(API.getProfile());
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await services.getAllPost({ username: user.username });
      setPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                <a href="">0 Followings</a>
              </div>
            </li>
            <li>
              <button onClick={() => history.push(Router.settings)}>
                Edit profile
              </button>
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
                {posts.length &&
                  posts.map((post, index) => {
                    return (
                      <div className="col-12 col-md-3" key={index}>
                        <div className="item">
                          <img
                            className="img-fluid"
                            src={`${post.avatarPath || post.fileUrls[0]}`}
                          />
                          <div className="thumbs"></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
