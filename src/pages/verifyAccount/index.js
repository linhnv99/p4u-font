import React, { useState, useEffect } from "react";
import queryString from "query-string";
import services from "../../api/services";
import { useHistory } from "react-router-dom";
import Auth from "../../api/auth";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import { getErrorMessage } from "../../errors";

function VerifyAccount({ location: { search } }) {
  const history = useHistory();
  const [error, setError] = useState();
  const [errorToken, setErrorToken] = useState();
  const [email, setEmail] = useState();
  const { token } = queryString.parse(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await services.loginByToken({ token });
        Auth.setToken(response.data.accessToken);
        history.push(Router.home);
      } catch (error) {
        setErrorToken(getErrorMessage(error.data.code));
      }
    };
    if (token) {
      fetchData();
    }
  }, []);

  const handleGetNewOTP = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await services.requestOTP({ email });
        if (response.code === 200) {
          Toaster.info("Vui lòng kiểm tra email của bạn để hoàn tất xác thực!");
        }
      } catch (error) {
        Toaster.error(getErrorMessage(error.data.code), 2000);
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
                  <h2 className="title">Verify Account</h2>
                  {errorToken && (
                    <div className="alert alert-danger text-center">{errorToken}</div>
                  )}
                  <form
                    className="mt-4"
                    style={{ maxwidth: "470px" }}
                    onSubmit={handleGetNewOTP}
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
                      Get new otp
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

export default VerifyAccount;
