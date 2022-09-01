import { authService } from "./authService";
import { postService } from "./postService";
import { commentService } from "./commentService";

const services = {
  ...authService,
  ...postService,
  ...commentService,
};

export default services;
