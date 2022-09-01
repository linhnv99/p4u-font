import React, { useState } from "react";
import Modal from "../../components/Layout/Modal";
import services from "../../api/services";
import Toaster from "../../utils/toaster";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import { getErrorMessage } from "../../errors";

function SignUp({ isShow, onClose }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [notifySuccess, setNotifySuccess] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    if (
      !validateUsername(username) ||
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateName(name)
    ) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await services.signUp({
          name,
          username,
          email,
          password,
        });

        if (response.code === 200) {
          // Toaster.info(
          //   "Đăng ký thành công! Vui lòng kiểm tra mail để xác nhận tài khoản.",
          //   3000
          // );
          setNotifySuccess(
            "Đăng ký thành công! Vui lòng kiểm tra mail để xác thực tài khoản của bạn."
          );
        }
      } catch (error) {
        Toaster.error(getErrorMessage(error.data.code), 2500);
        setNotifySuccess("");
      }
    };
    fetchData();
  };

  const validateName = (name) => {
    const nameTrim = name.trim();
    if (!nameTrim) {
      setError({ ...error, name: "Name là bắt buộc." });
      return false;
    }
    setError({ ...error, name: "" });
    setName(nameTrim);
    return true;
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{6,}/;
    const usernameTrim = username.trim();
    if (!usernameTrim) {
      setError({ ...error, username: "Username là bắt buộc." });
      return false;
    }
    if (usernameTrim.length < 6 || !regex.test(usernameTrim)) {
      setError({
        ...error,
        username: "Username phải lớn hơn 6 và là kí tự thường, số.",
      });
      return false;
    }
    setError({ ...error, username: "" });
    setUsername(usernameTrim);
    return true;
  };

  const validateEmail = (email) => {
    const emailTrim = email.trim();
    if (!emailTrim) {
      setError({ ...error, email: "Email là bắt buộc." });
      return false;
    }
    setError({ ...error, email: "" });
    setEmail(emailTrim);
    return true;
  };

  const validatePassword = (password) => {
    const passwordTrim = password.trim();
    if (!passwordTrim) {
      setError({ ...error, password: "Password là bắt buộc." });
      return false;
    }
    if (passwordTrim.length < 6) {
      setError({ ...error, password: "Password phải lớn hơn 6 kí tự" });
      return false;
    }
    setError({ ...error, password: "" });
    setPassword(passwordTrim);
    return true;
  };

  return (
    <Modal isShow={isShow} onClose={onClose} title="Sign up to discover">
      <form onSubmit={handleSignUp}>
        {notifySuccess && (
          <div className="alert alert-success text-center">{notifySuccess}</div>
        )}

        <div className="form mb-4">
          <input
            type="name"
            placeholder="Your name"
            className="form-control"
            name="name"
            defaultValue={name}
            onChange={(e) => validateName(e.target.value)}
          />
          {error && error.name && (
            <small className="d-block mt-1 text-danger">{error.name}</small>
          )}
        </div>
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
