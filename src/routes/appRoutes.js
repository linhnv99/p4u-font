import Router from "./router";
import Home from "../pages/home/index.js";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import CreatePost from "../pages/createPost";
import Profile from "../pages/profile";
import VerifyAccount from "../pages/verifyAccount";

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
];

export default appRoutes;
