const routes = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  verifyCode: "/verify-code",
  createPost: "/create-post",
  profile: "/profile",
  verifyAccount: "/verify-account",
  forgotPassword: "/forgot-password",
  postDetail: "/post/:id",
  settings: "/settings"
};

// format route: /route/:id => route/1

const Router = {
  ...routes,
  get: (pathInput, params) => {
    let path = pathInput;
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        path = path.replace(`:${paramKey}`, params[paramKey]);
      });
    }
    return path;
  },
};

export default Router;
