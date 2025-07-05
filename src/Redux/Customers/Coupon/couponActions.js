import axios from "axios";
import {
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAILURE,
} from "./couponActionTypes";
import api, { API_BASE_URL } from "../../../config/api";

export const applyCoupon = (code, userId, orderId) => async (dispatch) => {
     console.log("🧾 Order ID in applyCoupon:", orderId);
  try {
    dispatch({ type: APPLY_COUPON_REQUEST });

    const { data } = await api.post("api/coupons/apply", { code, userId, orderId });
 console.log("🧾 Order ID in applyCoupon:", orderId);
    dispatch({ type: APPLY_COUPON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAILURE,
      payload: error.response?.data?.message || "Failed to apply coupon",
    });
  }
};
