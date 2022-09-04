import React, { forwardRef} from "react";
import * as Yup from "yup";
import Toaster from "../../utils/toaster";
import services from "../../api/services";
import { getErrorMessage } from "../../errors";
import { Formik, ErrorMessage } from "formik";


export const AccountSetting = forwardRef(({ user }, ref) => {
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .trim()
      .min(6, "Mật khẩu phải lớn hơn 6 kí tự.")
      .required("Mật khẩu không được để trống."),
  });

  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await services.changePassword(values);
      if (response.code === 200) {
        Toaster.success("Đổi mật khẩu thành công");
        resetForm();
      }
    } catch (error) {
      Toaster.error(getErrorMessage(error.data.code));
      setSubmitting(false);
    }
  };
  return (
    <div className="settings-detail" ref={ref}>
      <div className="title">Tài khoản</div>
      <div className="content">
        <Formik
          initialValues={{
            newPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
          render={({
            values,
            handleChange,
            isSubmitting,
            handleSubmit,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="box-input">
                <label htmlFor="">Tên tài khoản</label>
                <div className="form">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={user.username}
                    disabled
                  />
                </div>
              </div>
              <div className="box-input">
                <label htmlFor="">Email</label>
                <div className="form">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
              <div className="box-input">
                <label htmlFor="">Mật khẩu mới</label>
                <div className="form">
                  <input
                    type="text"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="mt-1 text-danger"
                  />
                </div>
              </div>

              <div className="box-input">
                <label htmlFor=""></label>
                <div className="form">
                  <button disabled={isSubmitting}>Đổi mật khẩu</button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
});
