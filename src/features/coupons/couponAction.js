import {
  postNewCoupon,
  getAllCoupons,
  getACoupon,
  deleteCoupon,
  updateCoupon,
} from "./couponAxios";
import { setCoupons, setCoupon } from "./couponSlice";

// Create new coupon action
export const createNewCouponAction = (couponData) => async (dispatch) => {
  try {
    const response = await postNewCoupon(couponData);

    if (response.status === "success") {
      dispatch(getAllCouponsAction()); // Refresh coupons after insert
      return true;
    }
  } catch (error) {
    console.error("Error creating coupon:", error);
  }
};

// Get all coupons action
export const getAllCouponsAction = () => async (dispatch) => {
  try {
    const response = await getAllCoupons();

    if (response.status === "success") {
      dispatch(setCoupons(response.coupons));
    }
  } catch (error) {
    console.error("Error fetching coupons:", error);
  }
};

// Get a single coupon action
export const getCouponAction = (couponId) => async (dispatch) => {
  try {
    const response = await getACoupon(couponId);

    if (response.status === "success") {
      dispatch(setCoupon(response.coupon));
    }
  } catch (error) {
    console.error("Error fetching coupon:", error);
  }
};

// Update coupon action
export const updateCouponAction = (couponId, coupon) => async (dispatch) => {
  try {
    const response = await updateCoupon(couponId, coupon);

    if (response.status === "success") {
      dispatch(getAllCouponsAction()); // Refresh coupons after update
      return true;
    }
  } catch (error) {
    console.error("Error updating coupon:", error);
  }
};

// Delete coupon action
export const deleteCouponAction = (couponId) => async (dispatch) => {
  try {
    const response = await deleteCoupon(couponId);

    if (response.status === "success") {
      dispatch(getAllCouponsAction()); // Refresh coupons after delete
    }
  } catch (error) {
    console.error("Error deleting coupon:", error);
  }
};
