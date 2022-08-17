import AxiosInstance from "../axios";

const login = (args) => AxiosInstance.post("/users/login", args);

const loginByToken = (args) => AxiosInstance.post("users/login/tokens", args);

const signUp = (args) => AxiosInstance.post("/users/sign-up", args);

const getMe = () => AxiosInstance.get("/profiles");

const verifyCode = (args) => AxiosInstance.post("/users/otp-verifier", args);

const requestOTP = (args) => AxiosInstance.post("/users/otp-requester", args);

const randomImage = () => AxiosInstance.get("/image-random");

export const authService = {
  login,
  signUp,
  getMe,
  verifyCode,
  loginByToken,
  requestOTP,
  randomImage
};
