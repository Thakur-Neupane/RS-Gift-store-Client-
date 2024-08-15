import { createSlice } from "@reduxjs/toolkit";

const subCatInfo = createSlice({
  name: "subCatInfo",
  initialState: {
    subCats: [], // Initial state for subcategories
  },
  reducers: {
    setSubCats: (state, action) => {
      state.subCats = action.payload;
    },
  },
});

export const { setSubCats } = subCatInfo.actions;
export default subCatInfo.reducer;
