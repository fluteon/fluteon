// import React from "react";
// import CartItem from "./CartItem";
// import { Badge, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getCart } from "../../../Redux/Customers/Cart/Action";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const jwt = localStorage.getItem("jwt");
//   const {cart}=useSelector(store=>store);
//   console.log("cart ",cart)

//   useEffect(() => {
//     dispatch(getCart(jwt));
//   }, [jwt]);
//   return (
//   <div className="">
//     {cart.cartItems.length > 0 ? (
//       <div className="lg:grid grid-cols-3 lg:px-16 relative p-4">
//         {/* Your existing cart layout... */}
//         <div className="lg:col-span-2 lg:px-5 bg-white">
//           <div className="space-y-3">
//             {cart.cartItems.map((item) => (
//               <CartItem item={item} showButton={true} key={item} />
//             ))}
//           </div>
//         </div>
//         <div className=" sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
//           <div className="border p-5 bg-white shadow-lg rounded-md">
//             <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
//             <hr />
//             <div className="space-y-3 font-semibold">
//               <div className="flex justify-between pt-3 text-black ">
//                 <span>Price ({cart.cart?.totalItem} item)</span>
//                 <span>₹{cart.cart.totalPrice}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Discount</span>
//                 <span className="text-green-700">-₹{cart.cart?.discounte}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Charges</span>
//                 <span className="text-green-700">Free</span>
//               </div>
//               <hr />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total Amount</span>
//                 <span className="text-green-700">₹{cart.cart?.totalDiscountedPrice}</span>
//               </div>
//             </div>

//             <Button
//               onClick={() => navigate("/checkout?step=2")}
//               variant="contained"
//               type="submit"
//               sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
//             >
//               Check Out
//             </Button>
//           </div>
//         </div>
//       </div>
//     ) : (
//       // 👇 Empty cart UI
//       <div className="flex flex-col justify-center items-center py-20">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//           alt="Empty Cart"
//           className="w-32 h-32 mb-6 opacity-70"
//         />
//         <p className="text-xl font-semibold text-gray-700 mb-4">Your cart is empty</p>
//         <Button
//           onClick={() => navigate("/")}
//           variant="contained"
//           color="primary"
//         >
//           Continue Shopping
//         </Button>
//       </div>
//     )}
//   </div>
// );
// };

// export default Cart;


import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector((store) => store);
  const isLoggedIn = Boolean(jwt);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      dispatch(getCart(jwt))
  }, [jwt]);
  return (
    
    <div className="">
      {cart.loading && (
  <Backdrop
    open
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
)}

      {cart.cartItems.length > 0 ? (
        <div className="lg:grid grid-cols-3 lg:px-16 relative p-4">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 lg:px-5 bg-white">
          <div className="space-y-3">
           {cart.cartItems.map((item) => (
              <CartItem item={item} showButton={true} key={item} />
            ))}
          </div>
          </div>

          {/* Right: Price Summary */}
          <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0">
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
      )}
    </div>
  );
};

export default Cart;
