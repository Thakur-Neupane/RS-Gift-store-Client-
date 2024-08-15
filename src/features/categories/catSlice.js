import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cats: [],
};

const catSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCats: (state, { payload = [] }) => {
      state.cats = payload;
    },
  },
});

const { reducer, actions } = catSlice;

export const { setCats } = actions;

export default reducer;
