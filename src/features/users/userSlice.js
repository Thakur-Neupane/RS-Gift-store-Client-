import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  userList: [], // Ensure this is initialized
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUsers: (state, { payload }) => {
      state.userList = payload; // Update userList with all users
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, setUsers } = actions;
export default reducer;
