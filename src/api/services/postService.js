import AxiosInstance from "../axios";

const createPost = (args) =>
  AxiosInstance.post("/posts", args, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const getAllPost = (params) => AxiosInstance.get("/posts", { params });

export const postService = {
  createPost,
  getAllPost,
};
