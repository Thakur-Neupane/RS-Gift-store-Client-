import {
  fetchUserProfile,
  postNewUser,
  userLogin,
  verifyUserLink,
  getNewAccessJWT,
  logoutUser,
  fetchAllUsers,
  fetchUserById,
  deleteUser,
  updateUserRole,
  updateUserStatus,
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

export const fetchUserByIdAction = (id) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error("ID must be provided");
    }
    const { status, user } = await fetchUserById(id);

    if (status === "success") {
      dispatch(setUser(user));
    } else {
      console.error("Failed to fetch user:", status);
    }
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
  }
};

export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    if (!id) {
      throw new Error("ID must be provided");
    }

    const response = await deleteUser(id);

    if (response.status === "success") {
      const { userList } = getState().userInfo;

      const updatedUserList = userList.filter((user) => user._id !== id);

      dispatch(setUsers(updatedUserList));
    } else {
      console.error("Failed to delete user:", response.status);
    }
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

export const updateUserRoleAction = (id, newRole) => async (dispatch) => {
  try {
    // Call the API function to update the user role
    const response = await updateUserRole(id, newRole);

    if (response?.status === "success") {
      // Optionally, dispatch an action to update the state with the new user info
      // dispatch(setUser(response.user)); // If needed
      return response;
    } else {
      console.error("Failed to update user role:", response.message);
      throw new Error(response.message); // Throw error to handle it in the component
    }
  } catch (error) {
    console.error("Failed to update user role:", error);
    throw error; // Throw error to handle it in the component
  }
};

// Action to update user status
export const updateUserStatusAction = (id, status) => async (dispatch) => {
  try {
    const response = await apiProcessWithToast({ status }, () =>
      updateUserStatus(id, status)
    );

    if (response.status === "success") {
      dispatch(setUser(response.user));
    } else {
      console.error("Failed to update user status:", response.message);
    }
  } catch (error) {
    console.error("Failed to update user status:", error);
  }
};
