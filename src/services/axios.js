import axios from "axios";
import { toast } from "react-toastify";
import { getNewAccessJWT } from "../features/users/userAxios";

const getAccessJWT = () => sessionStorage.getItem("accessJWT");
const getRefreshJWT = () => localStorage.getItem("refreshJWT");

const handleToast = async (pending, showToast) => {
  if (showToast) {
    toast.promise(pending, {
      pending: "Please wait...",
    });
    const response = await pending;
    toast[response.data.status](response.data.message);
    return response;
  }
  return await pending;
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

    const pendingRequest = axios({ method, url, data, headers });
    const response = await handleToast(pendingRequest, showToast);

    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "jwt expired") {
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

    if (showToast) toast.error(error.message);

    return {
      status: "error",
      message: error.message,
    };
  }
};
