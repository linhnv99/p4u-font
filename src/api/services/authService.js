import AxiosInstance from "../axios";

const login = (args) => AxiosInstance.post("/users/login", args);

const signUp = (args) => AxiosInstance.post("/users/sign-up", args);

const getMe = () => AxiosInstance.get("/profiles");

const verifyCode = (args) => AxiosInstance.post("/users/verifier-otp", args);

export const authService = {
  login,
  signUp,
  getMe,
  verifyCode
};
