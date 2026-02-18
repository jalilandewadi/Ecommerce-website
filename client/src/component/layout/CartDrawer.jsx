import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContaints from "../cart/CartContaints";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ isCartOpen, toggleCartBar }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    toggleCartBar();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* {close btn} */}
      <div className="flex p-4 justify-end">
        <button onClick={toggleCartBar}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* {Cart components} */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products.length > 0 ? (
          <CartContaints cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {/* {Checkout btn} */}
      <div className="bg-white bottom-0 sticky">
        {cart && cart?.products.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold  hover:bg-gray-700 transition "
            >
              Checkout
            </button>
            <p className="text-sm tracking-tight text-gray-500 mb-2 mt-2 text-center ">
              Shipping , texes and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
