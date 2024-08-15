import axios from "axios";
import { toast } from "react-toastify";
import { getNewAccessJWT } from "../features/users/userAxios";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};

const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

export const apiProcessor = async ({
  method,
  url,
  data,
  isPrivate,
  isRefreshJWT,
  showToast,
}) => {
  try {
    const headers = isPrivate
      ? {
          Authorization: isRefreshJWT ? getRefreshJWT() : getAccessJWT(),
        }
      : null;
    const pending = axios({
      method,
      url,
      data,
      headers,
    });

    let response = {};
    if (showToast) {
      toast.promise(pending, {
        pending: "Please wait...",
      });

      response = await pending;

      toast[response.data.status](response.data.message);
    } else {
      response = await pending;
    }

    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "jwt expired") {
      //renew the access token and call the same server again

      const response = await getNewAccessJWT();

      if (response.accessJWT) {
        sessionStorage.setItem("accessJWT", response.accessJWT);
        return apiProcessor({
          method,
          url,
          data,
          isPrivate,
          isRefreshJWT,
          showToast,
        });
      }
    }

    if (error.response?.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }

    showToast && toast.error(error.message);

    return {
      status: "error",
      message: error.message,
    };
  }
};
