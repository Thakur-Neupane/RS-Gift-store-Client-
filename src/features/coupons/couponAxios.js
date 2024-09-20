import { apiProcessor } from "../../services/axios";

const couponEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/coupons";

// Post new coupon
export const postNewCoupon = (data) => {
  const obj = {
    url: couponEP,
    method: "post",
    data,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Get all coupons
export const getAllCoupons = () => {
  const obj = {
    url: couponEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Get a single coupon by ID
export const getACoupon = (couponId) => {
  const obj = {
    url: `${couponEP}/${couponId}`,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Delete coupon by ID
export const deleteCoupon = (couponId) => {
  const obj = {
    url: `${couponEP}/${couponId}`,
    method: "delete",
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Update coupon by ID
export const updateCoupon = (couponId, coupon) => {
  const obj = {
    url: `${couponEP}/${couponId}`,
    method: "put",
    data: coupon,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};
