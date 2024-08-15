import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null, // State for a single product
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setProduct } = productSlice.actions;

export default productSlice.reducer;
