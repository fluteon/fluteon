
import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Badge,
  Button,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { createPayment } from "../../../Redux/Customers/Payment/Action";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true); // 👈 loader state for order fetch

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoadingOrder(true);
        await dispatch(getOrderById(orderId));
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoadingOrder(false); // ✅ hide loader
      }
    };

    if (orderId) fetchOrder();
  }, [dispatch, orderId]);

  const handleCreatePayment = () => {
    const data = { orderId: order.order?._id, jwt };
    setIsLoadingPayment(true);
    dispatch(createPayment(data)).finally(() => setIsLoadingPayment(false));
  };

  // ⏳ Show loader if order is still loading
if (
  isLoadingOrder ||
  !order.order || 
  !order.order.totalDiscountedPrice || 
  !order.order.orderItems
) {
  return (
    <Backdrop
      open
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
      <span className="ml-3 text-white font-medium">Loading Order...</span>
    </Backdrop>
  );
}


  return (
    <div className="space-y-5">
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard address={order.order?.shippingAddress} />
      </div>

      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {order.order?.orderItems.map((item) => (
              <CartItem key={item._id} item={item} showButton={false} />
            ))}
          </div>
        </div>

        <div className="sticky top-0  mt-5 lg:mt-0 lg:ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({order.order?.totalItem} item)</span>
                <span>₹{order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{order.order?.discounte}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">
                  ₹{order.order?.totalDiscountedPrice}
                </span>
              </div>
            </div>

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

      {isLoadingPayment && (
        <Backdrop
          open
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
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
