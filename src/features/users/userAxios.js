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

// Function to fetch all users
export const fetchAllUsers = () => {
  const obj = {
    url: `${userEP}/all`,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Get one user by id
export const fetchUserById = (id) => {
  const obj = {
    url: `${userEP}/${id}`,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// delete a user by id
export const deleteUser = (id) => {
  const obj = {
    url: `${userEP}/${id}`,
    method: "delete",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

export const updateUserRole = (id, role) => {
  const obj = {
    url: `${userEP}/${id}/role`,
    method: "patch",
    data: { role },
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Update user status
export const updateUserStatus = (id, status) => {
  const obj = {
    url: `${userEP}/${id}/status`,
    method: "patch",
    data: { status },
    isPrivate: true,
  };

  return apiProcessor(obj);
};
