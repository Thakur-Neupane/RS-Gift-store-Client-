import { apiProcessor } from "../../services/axios";
const userEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/users";

export const postNewUser = (data) => {
  const obj = {
    url: userEP,
    method: "post",
    data,
    // isPrivate: true
  };

  return apiProcessor(obj);
};

export const verifyUserLink = (data) => {
  const obj = {
    url: userEP + "/user-verification",
    method: "post",
    data,
  };

  return apiProcessor(obj);
};

export const userLogin = (data) => {
  const obj = {
    url: userEP + "/login",
    method: "post",
    data,
    showToast: true,
  };

  return apiProcessor(obj);
};

export const fetchUserProfile = () => {
  const obj = {
    url: userEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

export const getNewAccessJWT = () => {
  const obj = {
    url: userEP + "/new-accessjwt",
    method: "get",
    isPrivate: true,
    isRefreshJWT: true,
  };

  return apiProcessor(obj);
};

export const logoutUser = () => {
  const obj = {
    url: userEP + "/logout",
    method: "delete",
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

export const requestOTP = (data) => {
  const obj = {
    url: userEP + "/otp",
    method: "post",
    showToast: true,
    data,
  };

  return apiProcessor(obj);
};
export const resetPassword = (data) => {
  const obj = {
    url: userEP + "/password/reset",
    method: "patch",
    showToast: true,
    data,
  };

  return apiProcessor(obj);
};
