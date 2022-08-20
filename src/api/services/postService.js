import AxiosInstance from "../axios";

const createPost = (args) => AxiosInstance.post("/posts", args, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
});

export const postService = {
  createPost,
};
