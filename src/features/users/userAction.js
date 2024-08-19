import {
  fetchUserProfile,
  postNewUser,
  userLogin,
  verifyUserLink,
  getNewAccessJWT,
  logoutUser,
  fetchAllUsers,
} from "./userAxios";
import { setUser, setUsers } from "./userSlice";

// Updated apiProcessWithToast function without toast
const apiProcessWithToast = async (obj, func) => {
  if (typeof func !== "function") {
    throw new Error("The provided 'func' is not a function");
  }

  try {
    const pending = func(obj);
    const response = await pending;
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const createNewAdminAction = (userData) => async (dispatch) => {
  try {
    const response = await apiProcessWithToast(userData, postNewUser);
    // Handle further stuff here if needed
    return response; // Return response if needed
  } catch (error) {
    console.error("Failed to create new admin:", error);
  }
};

export const verifyUserLinkAction = (data) => async (dispatch) => {
  try {
    const response = await apiProcessWithToast(data, verifyUserLink);
    return response; // Return response if needed
  } catch (error) {
    console.error("Failed to verify user link:", error);
  }
};

export const loginAdminAction = (data) => async (dispatch) => {
  try {
    const { status, jwts } = await userLogin(data);

    if (jwts?.accessJWT && jwts?.refreshJWT) {
      sessionStorage.setItem("accessJWT", jwts.accessJWT);
      localStorage.setItem("refreshJWT", jwts.refreshJWT);

      dispatch(fetchUserProfileAction());
    }
  } catch (error) {
    console.error("Failed to login admin:", error);
  }
};

export const fetchUserProfileAction = () => async (dispatch) => {
  try {
    const { status, userInfo } = await fetchUserProfile();

    if (status === "success") {
      dispatch(setUser(userInfo));
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
};

export const autoLoginAction = () => async (dispatch) => {
  try {
    const accessJWT = sessionStorage.getItem("accessJWT");
    if (accessJWT) {
      return dispatch(fetchUserProfileAction());
    }

    const refreshJWT = localStorage.getItem("refreshJWT");
    if (refreshJWT) {
      const response = await getNewAccessJWT();

      if (response?.accessJWT) {
        sessionStorage.setItem("accessJWT", response.accessJWT);
        dispatch(fetchUserProfileAction());
      }
    }
  } catch (error) {
    console.error("Failed to auto-login:", error);
  }
};

export const logoutUserAction = () => (dispatch) => {
  try {
    logoutUser();
    dispatch(setUser({}));
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");
  } catch (error) {
    console.error("Failed to logout user:", error);
  }
};

export const fetchAllUsersAction = () => async (dispatch) => {
  try {
    const response = await apiProcessWithToast({}, fetchAllUsers);

    if (response.status === "success") {
      dispatch(setUsers(response.users));
    } else {
      console.error("Failed to fetch users:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
