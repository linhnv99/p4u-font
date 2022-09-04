import React, { forwardRef } from "react";

export const AccountSetting = forwardRef(({ user }, ref) => {
  return (
    <div className="settings-detail" ref={ref}>
      <div className="title">Tài khoản</div>
      <div className="content">
        <form>
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
              <input type="text" name="email" className="form-control" />
            </div>
          </div>

          <div className="box-input">
            <label htmlFor=""></label>
            <div className="form">
              <button>Đổi mật khẩu</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
