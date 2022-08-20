import React, { useState } from "react";
import Modal from "../../components/Layout/Modal";
import services from "../../api/services";
import Toaster from "../../utils/toaster";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import { getErrorMessage } from "../../errors";

function SignUp({ isShow, onClose }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleSignUp = (event) => {
    event.preventDefault();
    if (
      !validateUsername(username) ||
      !validateEmail(email) ||
      !validatePassword(password)
    ) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await services.signUp({
          username,
          email,
          password,
        });

        if (response.code === 200) {
          Toaster.info(
            "Đăng ký thành công! Vui lòng kiểm tra mail để xác nhận tài khoản",
            3000
          );
        }
      } catch (error) {
        Toaster.error(getErrorMessage(error.data.code), 2000);
      }
    };
    fetchData();
  };

  const validateUsername = (username) => {
    if (!username) {
      setError({ ...error, username: "Username is required" });
      return false;
    }
    setError({ ...error, username: "" });
    setUsername(username);
    return true;
  };

  const validateEmail = (email) => {
    if (!email) {
      setError({ ...error, email: "Email is required" });
      return false;
    }
    setError({ ...error, email: "" });
    setEmail(email);
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setError({ ...error, password: "Password is required" });
      return false;
    }
    setError({ ...error, password: "" });
    setPassword(password);
    return true;
  };

  return (
    <Modal isShow={isShow} onClose={onClose} title="Sign up to discover">
      <form onSubmit={handleSignUp}>
        <div className="form mb-4">
          <input
            type="username"
            placeholder="Username"
            className="form-control"
            name="username"
            defaultValue={username}
            onChange={(e) => validateUsername(e.target.value)}
          />
          {error && error.username && (
            <small className="d-block mt-1 text-danger">{error.username}</small>
          )}
        </div>

        <div className="form mb-4">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            name="email"
            defaultValue={email}
            onChange={(e) => validateEmail(e.target.value)}
          />
          {error && error.email && (
            <small className="d-block mt-1 text-danger">{error.email}</small>
          )}
        </div>

        <div className="form mb-4">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            defaultValue={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {error && error.password && (
            <small className="d-block mt-1 text-danger">{error.password}</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>

        <div className="text-center">
          <p>
            Have an account?{" "}
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                history.push(Router.login);
              }}
            >
              Login
            </a>{" "}
            {!isShow && (
              <>
                /{" "}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(Router.home);
                  }}
                >
                  Home
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default SignUp;
