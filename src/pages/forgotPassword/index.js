import React, { useState, useEffect } from "react";
import services from "../../api/services";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import { getErrorMessage } from "../../errors";

function ForgotPassword() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [notifySuccess, setNotifySuccess] = useState("");
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await services.forgotPassword({ email });
        if (response.code === 200) {
          // Toaster.info("Vui lòng kiểm tra email của bạn để hoàn tất xác thực!");
          setNotifySuccess("Thành công. Vui lòng kiểm tra email của bạn.");
        }
      } catch (error) {
        Toaster.error(getErrorMessage(error.data.code), 2000);
        setNotifySuccess("");
      }
    };

    fetchData();
  };

  const validateEmail = (email) => {
    const emailTrim = email.trim();
    if (!emailTrim) {
      setError("Email là bắt buộc.");
      return false;
    }
    setError(null);
    setEmail(emailTrim);
    return true;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="modal-container">
            <div className="modal-content" style={{ marginTop: "20vh" }}>
              <div className="content">
                <div className="body">
                  <h2 className="title">Forgot Password</h2>
                  {notifySuccess && (
                    <div className="alert alert-success text-center">
                      {notifySuccess}
                    </div>
                  )}
                  <form
                    className="mt-4"
                    style={{ maxwidth: "470px" }}
                    onSubmit={handleForgotPassword}
                  >
                    <div className="form mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        defaultValue={email}
                        onChange={(e) => validateEmail(e.target.value)}
                      />
                      {error && (
                        <small className="d-block mt-1 text-danger">
                          {error}
                        </small>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Submit
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
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
