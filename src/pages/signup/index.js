import React, { useState } from "react";
import Modal from "../../components/Layout/Modal";
import services from "../../api/services";
import Toaster from "../../utils/toaster";
import { useHistory } from "react-router-dom";
import Router from "../../routes/router";
import { getErrorMessage } from "../../errors";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

function SignUp({ isShow, onClose }) {
  const history = useHistory();
  const [notifySuccess, setNotifySuccess] = useState("");

  const handleSignUp = async (
    { name, username, email, password },
    { setSubmitting, resetForm }
  ) => {
    try {
      const response = await services.signUp({
        name,
        username,
        email,
        password,
      });

      if (response.code === 200) {
        setNotifySuccess(
          "Đăng ký thành công! Vui lòng kiểm tra mail để xác thực tài khoản của bạn."
        );
        resetForm();
      }
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code), 2500);
      setNotifySuccess("");
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên của bạn không được để trống."),
    username: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9_]{6,}$/,
        "Tên đăng nhập phải lớn hơn 6 và là kí tự thường, số. Không bao gồm dấu cách."
      )
      .required("Tên đăng nhập không được để trống."),
    email: Yup.string().trim().required("Email không được để trống."),
    password: Yup.string()
      .trim()
      .min(6, "Mật khẩu phải lớn hơn 6 kí tự.")
      .required("Mật khẩu không được để trống."),
  });

  return (
    <Modal isShow={isShow} onClose={onClose} title="Sign up to discover">
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
        render={({
          values,
          handleChange,
          isSubmitting,
          handleSubmit,
          handleBlur,
        }) => (
          <form onSubmit={handleSignUp}>
            {notifySuccess && (
              <div className="alert alert-success text-center">
                {notifySuccess}
              </div>
            )}
            <div className="form mb-4">
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
                placeholder="Tên của bạn"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="d-block mt-1 text-danger"
              />
            </div>
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
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
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
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
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
        )}
      />
    </Modal>
  );
}

export default SignUp;
