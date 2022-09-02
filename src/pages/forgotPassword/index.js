import React, { useState, useEffect } from "react";
import services from "../../api/services";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import { getErrorMessage } from "../../errors";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

function ForgotPassword() {
  const history = useHistory();
  const [notifySuccess, setNotifySuccess] = useState("");

  const handleForgotPassword = async (
    { email },
    { setSubmitting, resetForm }
  ) => {
    try {
      const response = await services.forgotPassword({ email });
      if (response.code === 200) {
        setNotifySuccess(
          "Thành công. Mật khẩu mới sẽ được gửi tới mail của bạn."
        );
        resetForm();
      }
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code), 2000);
      setNotifySuccess("");
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
                  <h2 className="title">Quên mật khẩu</h2>
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
                    onSubmit={handleForgotPassword}
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
                          Quên mật khẩu
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

export default ForgotPassword;
