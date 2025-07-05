import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import authReducer from "./Auth/Reducer";
import customerProductReducer from "./Customers/Product/Reducer";
import cartReducer from "./Customers/Cart/Reducer";
import { orderReducer } from "./Customers/Order/Reducer";
import ReviewReducer from "./Customers/Review/Reducer";
import queryReducer from "./Customers/Query/Reducer";
import RatingSummaryReducer from "./Customers/Review/ratingSummaryReducer";
import couponReducer from "./Customers/Coupon/couponReducer";





const rootReducers=combineReducers({

    auth:authReducer,
    customersProduct:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    review:ReviewReducer,
    query: queryReducer,
    ratingSummaryState: RatingSummaryReducer,
    coupon: couponReducer,



});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))