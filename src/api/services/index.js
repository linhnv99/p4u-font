import { authService } from "./authService";
import { postService } from "./postService";

const services = {
  ...authService,
  ...postService,
};

export default services;
