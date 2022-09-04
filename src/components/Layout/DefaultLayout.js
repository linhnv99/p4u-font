import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../pages/login";
import SignUp from "../../pages/signup";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import userActions from "../../store/actions/userActions";
import { ToastContainer } from "react-toastify";
import Auth from "../../api/auth";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "../Avatar";

const DefaultLayout = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user);

  const [modalTypes, setModalTypes] = useState({
    type: "NONE",
  });

  useEffect(() => {
    dispatch(userActions.getMe());
  }, [dispatch]);

  const closeModal = () => {
    setModalTypes({ type: "NONE" });
  };

  const showModal = (type) => {
    setModalTypes({ type });
  };

  return (
    <div className="wrapper">
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-white shadow-1">
        <div className="container-fluid mx-0 mx-md-3">
          <b
            className="navbar-brand me-2 "
            onClick={() => history.push(Router.home)}
            style={{ cursor: "pointer" }}
          >
            {/* <img src="/assets/img/logo.png" className="img-fluild"/> */}
            Present for you
          </b>
          <div className="float-end d-flex justify-content-center align-items-center">
            {auth.isLogin && (
              <>
                <div className="me-3">
                  <button
                    className="text-black"
                    onClick={() => history.push(Router.createPost)}
                  >
                    <i className="fas fa-plus fa-2x"></i>
                  </button>
                </div>
                {/* <div className="dropdown">
                  <a
                    className="text-reset me-3 dropdown-toggle hidden-arrow"
                    href="#"
                  >
                    <i className="fas fa-bell fa-2x"></i>
                    <span className="badge rounded-pill badge-notification bg-danger">
                      1
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Some news
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another news
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div> */}
                <div className="dropdown">
                  <a className="dropdown-toggle d-flex align-items-center hidden-arrow">
                    <Avatar
                      width={35}
                      height={35}
                      avatarPath={auth.me?.avatar}
                      className="rounded-circle avt"
                    />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a
                        className="dropdown-item"
                        href="/profile"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(Router.profile);
                        }}
                      >
                        My profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/settings#account"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(Router.settings);
                        }}
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          Auth.removeToken();
                          history.push(Router.home);
                          window.location.reload();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {!auth.isLogin && (
              <div className="d-flex align-items-center">
                <button
                  onClick={() => showModal("LOGIN")}
                  type="button"
                  className="btn btn-link px-3 me-2"
                >
                  Login
                </button>
                <button
                  onClick={() => showModal("SIGN_UP")}
                  type="button"
                  className="btn btn-primary "
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: "3.2rem" }}>{children}</div>
      {modalTypes.type === "NONE" ? null : modalTypes.type === "LOGIN" ? (
        <Login isShow onClose={closeModal} />
      ) : (
        <SignUp isShow onClose={closeModal} />
      )}

      <ToastContainer />
    </div>
  );
};

export default DefaultLayout;
