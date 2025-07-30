
import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../Cart/CartItem";
import AddressCard from "../adreess/AdreessCard";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import { createPayment } from "../../../Redux/Customers/Payment/Action";
import { applyCoupon } from "../../../Redux/Customers/Coupon/couponActions";

import DiscountIcon from "@mui/icons-material/Discount";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const OrderSummary = () => {
  const [usedCoins, setUsedCoins] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const jwt = localStorage.getItem("jwt");

  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(null); // null | "valid" | "invalid"
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { discountAmount, error, message } = useSelector((state) => state.coupon);
const { order: orderState } = useSelector((state) => state);
const order = orderState.order;
console.log("🧾 Final Order from Redux:", order);


console.log("🌐 orderId from URL:", orderId);
console.log("🧠 Entire Redux state:", useSelector(state => state));

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoadingOrder(true);
        await dispatch(getOrderById(orderId));
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoadingOrder(false);
      }
    };

    if (orderId) fetchOrder();
  }, [dispatch, orderId]);

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponStatus("invalid");
      return;
    }

    if (!user || !user._id) {
      setCouponStatus("invalid");
      return;
    }

    if (!order || !order._id) {
      setCouponStatus("invalid");
      console.warn("⚠️ Order is not loaded yet!");
      return;
    }

    console.log("✅ Applying coupon to Order ID:", order._id);
dispatch(applyCoupon(couponCode, user._id, order._id));
  };

const handleCreatePayment = () => {
  const data = {
    orderId: order?._id,
    jwt,
    usedSuperCoins: usedCoins,
    couponDiscount: discountAmount, // ✅ send this to backend
  };

  setIsLoadingPayment(true);
  dispatch(createPayment(data)).finally(() => setIsLoadingPayment(false));
};


  // ⏳ Show loader if order is still loading
  if (
    isLoadingOrder ||
    !order ||
    !order.totalDiscountedPrice ||
    !order.orderItems
  ) {
    return (
      <Backdrop open sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
        <span className="ml-3 text-white font-medium">Loading Order...</span>
      </Backdrop>
    );
  }

  return (
    <div className="space-y-5">
      {/* Address Card */}
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard address={order?.shippingAddress} />
      </div>

      <div className="lg:grid grid-cols-3 relative justify-between">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {order?.orderItems?.map((item) => (
              <CartItem key={item._id} item={item} showButton={false} />
            ))}
          </div>
        </div>

        {/* Right Side: Coupon + Price Summary */}
        <div className="sticky top-0 mt-5 lg:mt-0 lg:ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">

            {/* 🧾 Coupon Code Section */}
            <div className="mb-6 border p-4 rounded-md bg-gray-50 shadow">
              <div className="flex items-center gap-2 mb-2">
                <DiscountIcon sx={{ color: "#1976d2" }} />
                <p className="font-semibold text-gray-700">Apply Coupon Code</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon (e.g. FLUTEON100)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-blue-500"
                />
                <Button variant="outlined" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>

              {/* Coupon Response */}
              {message && (
                <p className="flex items-center gap-2 text-green-600 mt-2 text-sm font-medium">
                  <VerifiedIcon fontSize="small" />
                  {message} (-₹{discountAmount})
                </p>
              )}
              {error && (
                <p className="flex items-center gap-2 text-red-600 mt-2 text-sm font-medium">
                  <ErrorOutlineIcon fontSize="small" />
                  {error}
                </p>
              )}
            </div>

            {/* 💰 Price Details */}
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />
            {/* 🪙 Super Coin Usage Section */}
<div className="mb-6 border p-4 rounded-md bg-yellow-50 shadow">
  <div className="flex items-center gap-2 mb-2">
    <MonetizationOnIcon sx={{ color: "#f9a825" }} />
    <p className="font-semibold text-gray-700">Super Coins</p>
  </div>

  <div className="flex items-center justify-between text-sm font-medium text-gray-800">
    <div>
      <span>Available:</span>{" "}
<span className="text-green-600 font-semibold">
  {user?.superCoins || 0}
</span>
{order?.earnedSuperCoins > 0 && (
  <span className="text-sm text-blue-600 font-medium ml-2">
    (+{order.earnedSuperCoins} earned from this order)
  </span>
)}
    </div>
    <div>
      <span className="text-blue-600">₹1 = 1 Coin</span>
    </div>
  </div>

  {/* Optional: input to use coins manually */}
<div className="mt-3 flex gap-2">
  <input
    type="number"
    placeholder="Use coins"
    value={usedCoins}
    onChange={(e) => {
      const value = Math.min(Number(e.target.value), user?.superCoins || 0);
      setUsedCoins(value >= 0 ? value : 0);
    }}
    className="border rounded-md px-3 py-1 w-full focus:outline-blue-500"
  />
  <Button
    size="small"
    variant="outlined"
    onClick={() => {
      // Optional logic if you want a manual apply button
      if (usedCoins > (user?.superCoins || 0)) {
        setUsedCoins(user?.superCoins || 0);
      }
    }}
  >
    Apply
  </Button>
</div>


  {/* Info note */}
  <p className="mt-2 text-xs text-gray-600 italic">
    You’ll earn more Super Coins after this order!
  </p>
</div>

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({order?.totalItem} item)</span>
                <span>₹{order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">
                  -₹{order?.discounte}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
     <div className="flex justify-between font-bold text-lg">
  <span>Total Amount</span>
  <span className="text-green-700">
    ₹
    {Math.max(
      (order?.totalDiscountedPrice || 0) - discountAmount - usedCoins,
      0
    )}
  </span>
</div>

            </div>

            {/* 💳 Payment Button */}
            <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>

      {/* ⏳ Loader for payment */}
      {isLoadingPayment && (
        <Backdrop open sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
          <span className="ml-3 text-white font-medium">
            Redirecting to payment...
          </span>
        </Backdrop>
      )}
    </div>
  );
};

export default OrderSummary;
