import React, { useState } from "react";
import Modal from "../../components/Layout/Modal";
import services from "../../api/services";
import Toaster from "../../utils/toaster";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";

function SignUp({ isShow, onClose }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleSignUp = (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setError({
        username: username ? "" : "Username is required",
        email: email ? "" : "Email is required",
        password: password ? "" : "Password is required",
      });
      return;
    }

    if (error.username || error.email || error.password) {
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
        const { code } = error.data;
        if (code === 404) {
          Toaster.error("Tên tài khoản đã tồn tại, Vui lòng nhập lại!", 3000);
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

  const validateEmail = (e) => {
    const email = e.target.value;
    if (email.trim().length == 0) {
      setError({ ...error, email: "Email is required" });
      return;
    }
    setError({ ...error, email: "" });
    setEmail(email);
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
    <Modal isShow={isShow} onClose={onClose} title="Sign up to discover">
      <form onSubmit={handleSignUp}>
        <div className="form mb-4">
          <input
            type="username"
            placeholder="Username"
            className="form-control"
            name="username"
            defaultValue={username}
            onChange={(e) => validateUsername(e)}
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
            onChange={(e) => validateEmail(e)}
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
            onChange={(e) => validatePassword(e)}
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
