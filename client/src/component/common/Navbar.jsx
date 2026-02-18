import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [navBarDrawerOpen, setNavBarDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);


  const cartItemCount = cart?.products?.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const toggleCartBar = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMenuBAr = () => {
    setNavBarDrawerOpen(!navBarDrawerOpen);
  };

  return (
    <>
      <nav className="container flex justify-between items-center mx-auto py-3 px-6">
        {/* {Left logo} */}
        <div className="">
          <Link to={"/"} className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* {Centre - Nvigation Links} */}
        <div className="hidden md:flex space-x-6">
          <Link
            to={"/collection/all?gender=Men"}
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Men
          </Link>
          <Link
            to={"/collection/all?gender=Women"}
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Women
          </Link>
          <Link
            to={"/collection/all?category=Top Wear"}
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Top Wear
          </Link>
          <Link
            to={"/collection/all?category=Bottom Wear"}
            className="text-gray-700 hover:text-black text-sm uppercase font-medium"
          >
            Bottom Wear
          </Link>
        </div>
        {/* {Right section} */}
        <div className="flex items-center space-x-4">
          <Link
            to={"/admin"}
            className="block bg-black px-2 rounded text-sm text-white"
          >
            Admin
          </Link>
          <Link to={"/profile"} className="text-gray-300 hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button onClick={toggleCartBar} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount >= 0 && (
              <span className="absolute -top-1 left-2.5 bg-rabbit-red rounded-full text-xs px-2 py-0.2">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* {Search} */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button onClick={toggleMenuBAr} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer isCartOpen={isCartOpen} toggleCartBar={toggleCartBar} />

      {/* {mobile navigation} */}

      <div
        className={`fixed top-0 w-3/4 sm:w1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navBarDrawerOpen ? "translate-x-0" : " -translate-x-full"
        } `}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenuBAr}>
            <IoMdClose className="h-6 m-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4  ">Menu</h2>
          <nav className=" space-y-4">
            <Link
              to={"/collection/all?gender=Men"}
              onClick={toggleMenuBAr}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to={"/collection/all?gender=Women"}
              onClick={toggleMenuBAr}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to={"/collection/all?category=Top Wear"}
              onClick={toggleMenuBAr}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to={"/collection/all?category=Bottom Wear"}
              onClick={toggleMenuBAr}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
