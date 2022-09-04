import { authService } from "./authService";
import { postService } from "./postService";
import { commentService } from "./commentService";
import { profileService } from "./profileService";

const services = {
  ...authService,
  ...postService,
  ...commentService,
  ...profileService,
};

export default services;
