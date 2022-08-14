import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Auth from "../../api/auth";
import Login from "../../pages/login/login";
import SignUp from "../../pages/signup/signup";
import Router from "../../routes/router";
import userActions from "../../store/actions/userActions";
import Toaster from "../../utils/toaster";
import Modal from "./Modal";

const DefaultLayout = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user);
  console.log(auth);
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
    console.log(modalTypes);
    setModalTypes({ type });
  };

  return (
    <div className="wrapper">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white shadow-1">
        <div className="container">
          <a className="navbar-brand me-2">Present for you</a>

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <div className="navbar-nav me-auto mb-2 mb-lg-0"></div>
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
                className="btn btn-primary me-3"
              >
                Sign up
              </button>
            </div>
            <div className="me-3">
              <a href="/create-post" className="text-black"><i className="fas fa-plus fa-2x"></i></a>
            </div>
            <div className="dropdown">
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-bell fa-2x"></i>
                <span className="badge rounded-pill badge-notification bg-danger">
                  1
                </span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
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
            </div>
            <div className="dropdown">
              <a className="dropdown-toggle d-flex align-items-center hidden-arrow">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="35"
                  alt="Black and White Portrait of a Man"
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/profile">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div style={{paddingTop: "3.2rem"}}>{children}</div>
      {modalTypes.type === "NONE" ? null : modalTypes.type === "LOGIN" ? (
        <Login isShow onClose={closeModal} />
      ) : (
        <SignUp isShow onClose={closeModal} />
      )}
    </div>
  );
};

export default DefaultLayout;
