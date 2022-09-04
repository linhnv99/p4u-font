import Router from "./router";
import Home from "../pages/home/index.js";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import CreatePost from "../pages/createPost";
import Profile from "../pages/profile";
import VerifyAccount from "../pages/verifyAccount";
import ForgotPassword from "../pages/forgotPassword";
import PostDetail from "../pages/postDetail";
import Setting from "../pages/setting";

const appRoutes = [
  {
    description: "Home page",
    path: Router.home,
    notProtected: true,
    exact: true,
    component: Home,
  },
  {
    description: "Login page",
    path: Router.login,
    notProtected: true,
    exact: true,
    component: Login,
  },
  {
    description: "SignUp page",
    path: Router.signUp,
    notProtected: true,
    exact: true,
    component: SignUp,
  },
  {
    description: "Create Post",
    path: Router.createPost,
    // notProtected: false,
    exact: true,
    component: CreatePost,
  },
  {
    description: "Profile",
    path: Router.profile,
    // notProtected: false,
    exact: true,
    component: Profile,
  },
  {
    description: "Verify Account",
    path: Router.verifyAccount,
    notProtected: true,
    exact: true,
    component: VerifyAccount,
  },
  {
    description: "Forgot Password",
    path: Router.forgotPassword,
    notProtected: true,
    exact: true,
    component: ForgotPassword,
  },
  {
    description: "Post Detail",
    path: Router.postDetail,
    notProtected: true,
    exact: true,
    component: PostDetail,
  },
  {
    description: "Settings",
    path: Router.settings,
    exact: true,
    component: Setting,
  },
];

export default appRoutes;
