import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUsers: (state, { payload }) => {
      state.userList = payload;
    },
  },
});

// Export actions
export const { setUser, setUsers } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
