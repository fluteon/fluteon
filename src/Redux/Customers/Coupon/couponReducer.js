// Redux/Customers/Coupon/Reducer.js
import {
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAILURE,
} from "./couponActionTypes";

const initialState = {
  loading: false,
  discountAmount: 0,
  message: "",
  error: null,
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_COUPON_REQUEST:
      return { ...state, loading: true, error: null };
    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        discountAmount: action.payload.discountAmount,
        message: action.payload.message,
        error: null,
      };
    case APPLY_COUPON_FAILURE:
      return {
        ...state,
        loading: false,
        discountAmount: 0,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default couponReducer;
