import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupons: [],
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupons: (state, { payload = [] }) => {
      state.coupons = payload;
    },
  },
});

const { reducer, actions } = couponSlice;

export const { setCoupons, setCoupon } = actions;

export default reducer;
