const API = {
  getAllPostNew: (params = "") => ({
    path: "/posts" + params,
    method: "get",
  }),
  getProfile: () => ({
    path: "/profiles",
    method: "get",
  }),
};

export default API;
