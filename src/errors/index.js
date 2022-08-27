export const getErrorMessage = (code) => {
  let message;
  switch (code) {
    case 402:
      message = "Tài khoản không tồn tại hoặc chưa được kích hoạt.";
      break;
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
    case 409:
      message = "Email đã được sử dụng. Vui lòng nhập email khác.";
      break;
    case 410:
      message = "Tài khoản đã bị khóa hoặc chưa được kích hoạt. Thử lại.";
      break;
    case 411:
      message = "Tồn tại tệp không hỗ trợ. Vui lòng thử lại.";
      break;
    default:
      message = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      break;
  }
  return message;
};
