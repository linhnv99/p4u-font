export const getErrorMessage = (code) => {
  let message;
  switch (code) {
    case 402:
    case 403:
      message = "Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.";
      break;
    case 404:
      message = "Tên tài khoản đã tồn tại. Vui lòng nhập lại.";
      break;
    case 405:
      message = "Đường dẫn không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.";
      break;
    case 407:
      message = "Tài khoản đã được xác thực";
      break;
    case 408:
      message = "Email không tồn tại. Vui lòng thử lại.";
      break;
    default:
      message = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      break;
  }
  return message;
};
