import { toast } from "react-toastify";
import {
  fetchUserProfile,
  postNewUser,
  userLogin,
  verifyUserLink,
  getNewAccessJWT,
  logoutUser,
} from "./userAxios";
import { setUser } from "./userSlice";

const apiProcessWithToast = async (obj, func) => {
  const pending = func(obj);
  toast.promise(pending, {
    pending: "Please wait...",
  });
  const respons = await pending;
  toast[respons.status](respons.message);
  return respons;
};

export const createNewAdminAction = async (userData) => {
  apiProcessWithToast(userData, postNewUser);
  // further stuff
};

export const verifyUserLinkAction = async (data) => {
  return apiProcessWithToast(data, verifyUserLink);
};

export const loginAdminAction = (data) => async (dispatch) => {
  const { status, jwts } = await userLogin(data);

  if (jwts?.accessJWT && jwts?.refreshJWT) {
    sessionStorage.setItem("accessJWT", jwts.accessJWT);
    localStorage.setItem("refreshJWT", jwts.refreshJWT);

    dispatch(fetchUserProfileAction());
  }

  //  if login success
};

export const fetchUserProfileAction = () => async (dispatch) => {
  const { status, userInfo } = await fetchUserProfile();

  if (status === "success") {
    //mount user in the redux store

    dispatch(setUser(userInfo));
  }
};

export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    //call get user method
    return dispatch(fetchUserProfileAction());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    // get a new access jwt then call get user method
    const response = await getNewAccessJWT();

    if (response?.accessJWT) {
      sessionStorage.setItem("accessJWT", response.accessJWT);
      dispatch(fetchUserProfileAction());
    }
  }
};

export const logoutUserAction = () => (dispatch) => {
  //call api with authorization for backend log out
  logoutUser();
  //frontend logout

  dispatch(setUser({}));
  localStorage.removeItem("refreshJWT");
  sessionStorage.removeItem("accessJWT");
};
