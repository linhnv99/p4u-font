const API = {
  getAllNewPosts: (params = "") => ({
    path: "/posts" + params,
    method: "get",
  }),
  getProfile: () => ({
    path: "/profiles",
    method: "get",
  }),
  getPost: (id) => ({
    path: "/posts/" + id,
    method: "get",
  }),
};

export default API;
