import api from "../services/api";

export const getAvatar = () => {
  return `${api.defaults.baseURL}/user/profile-pic?ts=${Date.now()}`;
};
