import AxiosInstance from "../axios";

const getProfileByUserId = (params) =>
  AxiosInstance.get("/profiles", { params });

const updateProfile = (args) => AxiosInstance.post("/profiles", args);

const updateAvatar = (args) => AxiosInstance.post("/profiles/avatars", args);

export const profileService = {
  getProfileByUserId,
  updateProfile,
  updateAvatar,
};
