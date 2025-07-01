import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem, getCart } from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item,showButton }) => {
  console.log("items....",item)
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
const baseUrl = process.env.REACT_APP_API_BASE_URL

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?._id, jwt };
    dispatch(removeCartItem(data));
  };
  // const handleUpdateCartItem=(num)=>{
  //   const data={data:{quantity:item.quantity+num}, cartItemId:item?._id, jwt}
  //   console.log("update data ",data)
  //   dispatch(updateCartItem(data))
  // }

  const handleUpdateCartItem = (num) => {
  const data = {
    data: { quantity: item.quantity + num },
    cartItemId: item?._id,
    jwt,
  };
  console.log("update data ", data);
  dispatch(updateCartItem(data)).then(() => {
    dispatch(getCart(jwt)); // ✅ Fetch updated cart totals immediately
  });
};

//   return (
//     <div className="p-5 shadow-lg border rounded-md">
//       <div className="flex items-center">
//         <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
//           <img
//             className="w-full h-full object-cover object-top"
//             src={item?.product?.imageUrl}
//             alt=""
//           />
//         </div>
//         <div className="ml-5 space-y-1">
//           <p className="font-semibold">{item?.product?.title}</p>
//           <p className="opacity-70">Size: {item?.size},White</p>
//           <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p>
//           <div className="flex space-x-2 items-center pt-3">
//   <p className="opacity-50 line-through">
//     ₹{item?.product?.price * item?.quantity}
//   </p>
//   <p className="font-semibold text-lg">
//     ₹{item?.product?.discountedPrice * item?.quantity}
//   </p>
//   <p className="text-green-600 font-semibold">
//     {item?.product?.discountPersent}% off
//   </p>
// </div>

//         </div>
//       </div>
//      {showButton&& <div className="lg:flex items-center lg:space-x-10 pt-4">
//         <div className="flex items-center space-x-2 ">
//           <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item?.quantity<=1} color="primary" aria-label="add an alarm">
//             <RemoveCircleOutlineIcon />
//           </IconButton>

//           <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
//           <IconButton onClick={()=>handleUpdateCartItem(1)} color="primary" aria-label="add an alarm">
//             <AddCircleOutlineIcon />
//           </IconButton>
//         </div>
//         <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
          
//           <Button onClick={handleRemoveItemFromCart} variant="text">
//             Remove{" "}
//           </Button>
          
//         </div>
//       </div>}
//     </div>
//   );
return (
  <div className="p-4 shadow-lg border rounded-md bg-white">
    <div className="flex flex-col lg:flex-row lg:items-center">
      {/* Image Section */}
      <div className="w-full h-[20rem] lg:w-[9rem] lg:h-[9rem] mx-auto lg:mx-0">
        <img
          className="object-cover object-top w-full h-full hover:scale-105 transition-transform duration-300"
          src={item?.product?.imageUrl?.[0]}
          alt="No image available"
        />
      </div>

      {/* Details Section */}
      <div className="mt-4 lg:mt-0 lg:ml-5 w-full space-y-1">
        <p className="font-semibold text-base">{item?.product?.title}</p>
        <p className="opacity-70 text-sm">Size: {item?.size}, White</p>
        <p className="opacity-70 text-sm">Seller: {item?.product?.brand}</p>

        <div className="flex flex-wrap gap-2 items-center pt-2">
          <p className="text-sm line-through text-gray-500">
            ₹{item?.product?.price * item?.quantity}
          </p>
          <p className="font-semibold text-md text-black">
            ₹{item?.product?.discountedPrice * item?.quantity}
          </p>
          <p className="text-green-600 font-semibold text-sm">
            {item?.product?.discountPersent}% off
          </p>
        </div>
      </div>
    </div>

    {/* Buttons */}
    {showButton && (
      <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4 gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center justify-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item?.quantity <= 1}
            color="primary"
          >
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-6 border rounded text-sm font-medium">
            {item?.quantity}
          </span>

          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            color="primary"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        {/* Remove Button */}
        <Button
          onClick={handleRemoveItemFromCart}
          variant="text"
          className="text-sm"
        >
          Remove
        </Button>
      </div>
    )}
  </div>
);

};

export default CartItem;
