import Router from "./router";
import Home from '../pages/home/home.js'
import Login from "../pages/login/login";
import SignUp from "../pages/signup/signup";
import CreatePost from "../pages/createPost/createPost";
import Profile from "../pages/profile/profile";

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
    notProtected: true,
    exact: true,
    component: CreatePost,
  },
  {
    description: "Profile",
    path: Router.profile,
    notProtected: true,
    exact: true,
    component: Profile,
  }
];

export default appRoutes;
