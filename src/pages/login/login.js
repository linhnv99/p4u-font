import React, { useState } from "react";
import Modal from "../../components/Layout/Modal";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import services from "../../api/services";
import Auth from "../../api/auth";

function Login({ isShow, onClose }) {
  const history = useHistory();
  const [error, setError] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError({
        username: username ? "" : "Username is required",
        password: password ? "" : "Password is required",
      });
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
          history.push(Router.news);
        }
      } catch (error) {
        const { code } = error.data;
        if (code === 402 || code === 403) {
          Toaster.error(
            "Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!",
            2000
          );
          return;
        }
        Toaster.error("Đã xảy ra lỗi. Vui lòng thử lại sau.", 2000);
      }
    };
    fetchData();
  };

  const validateUsername = (e) => {
    const username = e.target.value;
    if (username.trim().length == 0) {
      setError({ ...error, username: "Username is required" });
      return;
    }
    setError({ ...error, username: "" });
    setUsername(username);
  };

  const validatePassword = (e) => {
    const password = e.target.value;
    if (password.trim().length == 0) {
      setError({ ...error, password: "Password is required" });
      return;
    }
    setError({ ...error, password: "" });
    setPassword(password);
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
            onChange={(e) => validateUsername(e)}
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
            onChange={(e) => validatePassword(e)}
          />
          {error && error.password && (
            <small className="d-block mt-1 text-danger">{error.password}</small>
          )}
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <a href="#!">Forgot password?</a>
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
