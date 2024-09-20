import {
  fetchReviews,
  postNewReview,
  updateReview,
  deleteReview,
} from "./reviewAxios";
import { toast } from "react-toastify";
import { setAllReview, setPubReviews, updateReveiwStatus } from "./reviewSlice";

export const addNewReviewAction = (obj) => async (dispatch) => {
  try {
    const pending = postNewReview(obj);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;

    toast[status](message);

    if (status === "success") {
      dispatch(getReviewsAction(false)); // Refresh public reviews
      return true;
    }
  } catch (error) {
    toast.error("Error adding review: " + error.message);
  }
};

export const updateReviewAction = (obj) => async (dispatch) => {
  try {
    const pending = updateReview(obj);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;

    toast[status](message);

    if (status === "success") {
      dispatch(updateReveiwStatus(obj));
    }
  } catch (error) {
    toast.error("Error updating review: " + error.message);
  }
};

export const deleteReviewAction = (reviewId) => async (dispatch) => {
  try {
    const pending = deleteReview(reviewId);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;

    toast[status](message);

    if (status === "success") {
      dispatch(getReviewsAction(true)); // Refresh all reviews
    }
  } catch (error) {
    toast.error("Error deleting review: " + error.message);
  }
};

// Get reviews
export const getReviewsAction = (isPrivate) => async (dispatch) => {
  try {
    const { status, reviews } = await fetchReviews(isPrivate);

    if (status) {
      isPrivate
        ? dispatch(setAllReview(reviews))
        : dispatch(setPubReviews(reviews));
    }
  } catch (error) {
    toast.error("Error fetching reviews: " + error.message);
  }
};
