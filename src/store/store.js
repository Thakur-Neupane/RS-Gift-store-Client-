import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import subCatReducer from "../features/subcategories/subCatSlice";
import systemReducer from "./systemSlice";
import catReducer from "../features/categories/catSlice";
import productReducer from "../features/products/productSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import couponReducer from "../features/coupons/couponSlice";

export default configureStore({
  reducer: {
    userInfo: userReducer,
    system: systemReducer,
    catInfo: catReducer,
    subCatInfo: subCatReducer,
    productInfo: productReducer,
    reviewInfo: reviewReducer,
    couponInfo: couponReducer,
  },
});
