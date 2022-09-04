import React, { forwardRef, useState } from "react";
import Toaster from "../../utils/toaster";
import services from "../../api/services";
import { getErrorMessage } from "../../errors";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Avatar from "../../components/Avatar";
import { resizeFile } from "../../utils/imageUtils";
import SpinnerV2 from "../../components/Spinner/sprinnerV2";

export const ProfileSetting = forwardRef(({ user }, ref) => {
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSubmitProfile = async (values, { setSubmitting }) => {
    try {
      const response = await services.updateProfile(values);
      if (response.code === 200) {
        Toaster.success("Thay đổi hồ sơ cá nhân thành công.", 3000);
      }
    } catch (error) {
      console.log(error);
      Toaster.error(getErrorMessage(error.data.code));
      setSubmitting(false);
    }
  };

  const onUpdateAvatar = async (e, type) => {
    setIsUploading(true);
    try {
      let files = e.target.files;
      let fileResized = await resizeFile(files[0], 250, 250);
      const formData = new FormData();
      formData.append("file", fileResized);
      formData.append("avatarType", type);

      const response = await services.updateAvatar(formData);
      if (response.code === 200) {
        setIsUploading(false);
        setAvatar(response.data?.avatarUrl);
      }
    } catch (error) {
      console.log(error);
      Toaster.error(getErrorMessage(error.data.code));
      setIsUploading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên của bạn không được để trống."),
  });

  return (
    <div className="settings-detail" ref={ref}>
      <div className="title">Hồ sơ cá nhân</div>
      <div className="content">
        <Formik
          initialValues={{
            name: user.name || "",
            birthDay: user.birthDay || "",
            gender: user.gender || "OTHER",
            bio: user.bio || "",
            website: user.website || "",
            location: user.location || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitProfile}
          render={({ values, handleChange, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="box-input">
                <label htmlFor="">Ảnh đại diện</label>
                <div className="form d-flex align-items-center">
                  <Avatar
                    width={80}
                    height={80}
                    className="rounded-circle avt me-3"
                    avatarPath={avatar}
                  />
                  <div className="upload-trigger">
                    <span>Thêm ảnh</span>
                    <input
                      type="file"
                      accept="image/jpeg, image/gif, image/png, image/jpg"
                      onChange={(e) => onUpdateAvatar(e, "AVATAR")}
                    />
                  </div>
                  {isUploading && <SpinnerV2 />}
                </div>
              </div>
              <div className="box-input">
                <label htmlFor="">Tên của bạn</label>
                <div className="form">
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="d-block mt-1 text-danger"
                  />
                </div>
              </div>

              <div className="box-input">
                <label htmlFor="">Ngày sinh</label>
                <div className="form">
                  <input
                    type="date"
                    min="1980-01-01"
                    max="2030-12-31"
                    name="birthDay"
                    value={values.birthDay}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="box-radio">
                <label htmlFor="" style={{ width: "146px" }}>
                  Giới tính
                </label>
                <div className="form d-flex">
                  <span className="d-flex me-3">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="MALE"
                      onChange={handleChange}
                      checked={values.gender === "MALE"}
                    />
                    <label className="ms-1" htmlFor="male">
                      Nam
                    </label>
                  </span>
                  <span className="d-flex me-3">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="FEMALE"
                      onChange={handleChange}
                      checked={values.gender === "FEMALE"}
                    />
                    <label className="ms-1" htmlFor="female">
                      Nữ
                    </label>
                  </span>
                  <span className="d-flex me-3">
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="OTHER"
                      onChange={handleChange}
                      checked={values.gender === "OTHER"}
                    />
                    <label className="ms-1 w-0" htmlFor="other">
                      Khác
                    </label>
                  </span>
                </div>
              </div>
              <div className="box-input">
                <label htmlFor="">Giới thiệu</label>
                <div className="form">
                  <textarea
                    rows="4"
                    name="bio"
                    value={values.bio}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="box-input">
                <label htmlFor="">Website</label>
                <div className="form">
                  <input
                    type="text"
                    name="website"
                    value={values.website}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="box-input">
                <label htmlFor="">Địa chỉ</label>
                <div className="form">
                  <input
                    type="text"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="box-input">
                <label htmlFor=""></label>
                <div className="form">
                  <button type="submit" disabled={isSubmitting}>
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
});
