import AxiosInstance from "../axios";

const getAllComments = (params) => AxiosInstance.get("/comments", { params });
const getAllSubComments = (params) =>
  AxiosInstance.get("/sub-comments", { params });

const createComment = (args) => AxiosInstance.post("/comments", args);
const createSubComment = (args) =>
  AxiosInstance.post("/sub-comments", args);

export const commentService = {
  getAllComments,
  getAllSubComments,
  createComment,
  createSubComment,
};
