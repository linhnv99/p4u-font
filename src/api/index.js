const API = {
  getAllNewPosts: (params = "") => ({
    path: "/posts?size=20",
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
