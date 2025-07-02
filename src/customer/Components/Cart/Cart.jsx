

import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import RequireLogin from "../RequireLogin";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const isLoggedIn = Boolean(jwt);

  const { cart } = useSelector((store) => store);

  // 🛑 Show login UI if not logged in

  // ✅ Only fetch cart if logged in
useEffect(() => {
  if (isLoggedIn) {
    console.log("Getting cart for JWT:", jwt);
    dispatch(getCart(jwt));
  }
}, [dispatch, isLoggedIn, jwt]);

  if (!isLoggedIn) return <RequireLogin message="Please log in to view your cart." />;

  return (
    <div>
      {cart.loading && (
        <Backdrop
          open
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {cart.cartItems?.length > 0 ? (
        <div className="lg:grid grid-cols-3 lg:px-16 relative p-4">
          {/* Cart items */}
          <div className="lg:col-span-2 lg:px-5 bg-white space-y-3">
{Array.isArray(cart.cartItems) &&
  cart.cartItems.flat().map((item, i) =>
    item ? (
      <CartItem
        item={item}
        showButton={true}
        key={item._id || item.productId || i}
      />
    ) : null
  )}


          </div>

          {/* Price summary */}
          <div className="sticky top-0 mt-5 lg:mt-0">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />
              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price ({cart.cart?.totalItem || 0} item)</span>
                  <span>₹{cart.cart?.totalPrice || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">
                    -₹{cart.cart?.discounte || 0}
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
                    ₹{cart.cart?.totalDiscountedPrice || 0}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout?step=2")}
                variant="contained"
                type="submit"
                sx={{
                  padding: ".8rem 2rem",
                  marginTop: "2rem",
                  width: "100%",
                }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      ) : (
        !cart.loading && (
          <div className="flex flex-col justify-center items-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-32 h-32 mb-6 opacity-70"
            />
            <p className="text-xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </p>
            <Button onClick={() => navigate("/")} variant="contained" color="primary">
              Continue Shopping
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default Cart;
