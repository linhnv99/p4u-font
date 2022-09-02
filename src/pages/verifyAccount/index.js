import React, { useState, useEffect } from "react";
import queryString from "query-string";
import services from "../../api/services";
import { useHistory } from "react-router-dom";
import Auth from "../../api/auth";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import { getErrorMessage } from "../../errors";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

function VerifyAccount({ location: { search } }) {
  const history = useHistory();
  const [errorToken, setErrorToken] = useState();
  const [notifySuccess, setNotifySuccess] = useState("");
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

  const handleGetNewOTP = async ({ email }, { setSubmitting, resetForm }) => {
    try {
      const response = await services.requestOTP({ email });
      if (response.code === 200) {
        setNotifySuccess(
          "Vui lòng kiểm tra email của bạn để hoàn tất xác thực tài khoản."
        );
        resetForm();
      }
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code));
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required("Email không được để trống."),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="modal-container">
            <div className="modal-content" style={{ marginTop: "20vh" }}>
              <div className="content">
                <div className="body">
                  <h2 className="title">Xác thực tài khoản</h2>
                  {errorToken && (
                    <div className="alert alert-danger text-center">
                      {errorToken}
                    </div>
                  )}
                  {notifySuccess && (
                    <div className="alert alert-success text-center">
                      {notifySuccess}
                    </div>
                  )}
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleGetNewOTP}
                    render={({
                      values,
                      handleChange,
                      isSubmitting,
                      handleSubmit,
                      handleBlur,
                    }) => (
                      <form
                        className="mt-4"
                        style={{ maxwidth: "470px" }}
                        onSubmit={handleSubmit}
                      >
                        <div className="form mb-4">
                          <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="d-block mt-1 text-danger"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                          disabled={isSubmitting}
                        >
                          Xác thực tài khoản
                        </button>

                        <div className="text-center">
                          <p>
                            Đã có tài khoản?{" "}
                            <a
                              href="/login"
                              onClick={(e) => {
                                e.preventDefault();
                                history.push(Router.login);
                              }}
                            >
                              Đăng nhập
                            </a>{" "}
                            /{" "}
                            <a
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                history.push(Router.home);
                              }}
                            >
                              Trang chủ
                            </a>
                          </p>
                        </div>
                      </form>
                    )}
                  />
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
