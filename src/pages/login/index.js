import React, { useState } from "react";
import Modal from "../../components/Layout/Modal";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import services from "../../api/services";
import Auth from "../../api/auth";
import { getErrorMessage } from "../../errors";

function Login({ isShow, onClose }) {
  const history = useHistory();
  const [error, setError] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (!validateUsername(username) || !validatePassword(password)) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await services.login({
          username,
          password,
        });

        if (response.code === 200) {
          Auth.setToken(response.data.accessToken);
          history.push(Router.home);
          window.location.reload();
        }
      } catch (error) {
        Toaster.error(getErrorMessage(error.data.code), 2500);
      }
    };
    fetchData();
  };

  const validateUsername = (username) => {
    const usernameTrim = username.trim();
    if (!usernameTrim) {
      setError({ ...error, username: "Username là bắt buộc." });
      return false;
    }
    setError({ ...error, username: "" });
    setUsername(usernameTrim);
    return true;
  };

  const validatePassword = (password) => {
    const passwordTrim = password.trim();
    if (!passwordTrim) {
      setError({ ...error, password: "Password là bắt buộc." });
      return false;
    }
    setError({ ...error, password: "" });
    setPassword(passwordTrim);
    return true;
  };

  return (
    <Modal isShow={isShow} onClose={onClose} title="Log in to your account">
      <form onSubmit={handleLogin}>
        <div className="form mb-4">
          <input
            type="username"
            placeholder="Username"
            className="form-control"
            defaultValue={username}
            onChange={(e) => validateUsername(e.target.value)}
          />
          {error && error.username && (
            <small className="d-block mt-1 text-danger">{error.username}</small>
          )}
        </div>

        <div className="form mb-4">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            defaultValue={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {error && error.password && (
            <small className="d-block mt-1 text-danger">{error.password}</small>
          )}
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <a
              href="/forgot-password"
              onClick={(e) => {
                e.preventDefault();
                history.push(Router.forgotPassword);
              }}
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <a
              href="/sign-up"
              onClick={(e) => {
                e.preventDefault(), history.push(Router.signUp);
              }}
            >
              Sign up
            </a>{" "}
            {!isShow && (
              <>
                /{" "}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault(), history.push(Router.home);
                  }}
                >
                  Home
                </a>{" "}
              </>
            )}
            /{" "}
            <a
              href="/verify-account"
              onClick={(e) => {
                e.preventDefault(), history.push(Router.verifyAccount);
              }}
            >
              Verify Account
            </a>
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default Login;
