import React from "react";
import Modal from "../../components/Layout/Modal";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import Toaster from "../../utils/toaster";
import services from "../../api/services";
import Auth from "../../api/auth";
import { getErrorMessage } from "../../errors";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login({ isShow, onClose }) {
  const history = useHistory();

  const handleLogin = async (
    { username, password },
    { setSubmitting, resetForm }
  ) => {
    try {
      const response = await services.login({
        username,
        password,
      });

      if (response.code === 200) {
        Auth.setToken(response.data.accessToken);
        history.push(Router.home);
        window.location.reload();
        resetForm();
      }
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code), 2500);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required("Tên đăng nhập không được để trống."),
    password: Yup.string().trim().required("Mật khẩu không được để trống."),
  });

  return (
    <Modal isShow={isShow} onClose={onClose} title="Log in to your account">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        render={({
          values,
          handleChange,
          isSubmitting,
          handleSubmit,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form mb-4">
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tên đăng nhập"
                className="form-control"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="d-block mt-1 text-danger"
              />
            </div>

            <div className="form mb-4">
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mật khẩu"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="d-block mt-1 text-danger"
              />
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
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              disabled={isSubmitting}
            >
              Đăng nhập
            </button>

            <div className="text-center">
              <p>
                Chưa có tài khoản?{" "}
                <a
                  href="/sign-up"
                  onClick={(e) => {
                    e.preventDefault(), history.push(Router.signUp);
                  }}
                >
                  Đăng ký
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
                      Trang chủ
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
                  Xác thực tài khoản!
                </a>
              </p>
            </div>
          </form>
        )}
      />
    </Modal>
  );
}

export default Login;
