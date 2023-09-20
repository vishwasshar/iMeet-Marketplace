import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../Redux/CartSlice";
import { FaTrashAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillCartXFill } from "react-icons/bs";

const Page = () => {
  const cartList = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cartList);
    setTotalPrice(
      cartList
        .reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        )
        .toFixed(2)
    );
  }, [cartList]);

  const increment = ({ item }) => {
    dispatch(incrementQuantity(item));
  };

  const decrement = ({ item }) => {
    dispatch(decrementQuantity(item));
  };

  const remove = ({ item }) => {
    dispatch(removeFromCart(item));
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="px-[6%] md:px-[7%] overflow-hidden relative min-h-[80vh]">
      <Link
        to={"/"}
        className="flex justify-center items-center absolute top-2 left-10 bg-slate-100 p-3 rounded-full hover:scale-125 transition-transform duration-300"
      >
        <AiOutlineArrowLeft size={25} />
      </Link>
      {cartList.length ? (
        <div className="w-full flex flex-col md:flex-row justify-around py-[10px]">
          <div className="flex flex-col gap-10">
            <div className="h-[10px] grid grid-cols-6 gap-5">
              <p className=" flex justify-center font-semibold">Image</p>
              <p className=" flex justify-center font-semibold">Name</p>
              <p className=" flex justify-center font-semibold">Price</p>
              <p className=" flex justify-center font-semibold">Quantity</p>
              <p className=" flex justify-center font-semibold">TotalPrice</p>
              <p className="flex justify-center font-semibold">Actions</p>
            </div>
            {cartList.map((item, index) => {
              return (
                <div
                  data-aos="fade-left"
                  data-aos-duration={500 * (index % 2)}
                  data-aos-delay={200 * (index % 2)}
                  key={index}
                  className="grid grid-cols-6 gap-5 font-Poppins tracking-wider"
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      width="100"
                      height="100"
                      className="mx-auto"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    {item.title.substring(0, 4)}
                    {item.title.length > 4 ? "..." : ""}
                  </div>
                  <div className="flex justify-center items-center">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="flex justify-center items-center">
                    {item.quantity}
                  </div>
                  <div className="flex justify-center items-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="w-[25px] h-[25px] flex items-center justify-center bg-gray-100"
                      onClick={() => increment({ item })}
                    >
                      +
                    </button>
                    <button
                      className="w-[25px] h-[25px] flex items-center justify-center bg-gray-100"
                      onClick={() => decrement({ item })}
                    >
                      -
                    </button>
                    <button
                      className="w-[25px] h-[25px] flex items-center justify-center bg-gray-100"
                      onClick={() => remove({ item })}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" md:w-[400px] h-[500px] shadow-xl px-[2%] py-3 sticky top-10 rounded-md">
            <div className="flex justify-between items-center mb-[30px]">
              <h1 className="text-2xl font-Poppins font-medium tracking-wider">
                Basket Totals
              </h1>
              ${totalPrice}
            </div>
            <div className="grid grid-cols-3 mb-[20px]">
              <p className="font-bold">Name</p>
              <p className="font-bold text-center">Quantity</p>
              <p className="font-bold text-right">Total Price</p>
            </div>
            <div className="w-full flex flex-col gap-3 h-[280px] border-b mb-[20px] font-Poppins tracking-wider overflow-y-auto">
              {cartList.map((item, index) => {
                return (
                  <div className="grid grid-cols-3" key={item.id}>
                    <p className="font-medium">{item.title}</p>
                    <p className="font-medium text-center">{item.quantity}</p>
                    <p className="text-[#ff0e2c] font-medium text-right">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-center">
              <button className="bg-[#ff0e2c] py-2 text-center w-[70%] text-white font-Poppins tracking-wider rounded-s-full rounded-e-full hover:scale-110 transition-transform duration-300">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[80vh] flex flex-col gap-5 justify-center items-center ">
          <BsFillCartXFill size={100} className="text-[#ff0e2c]" />
          <p>
            Nothing in Cart. Please select from the{" "}
            <Link to={"/"} className="font-bold">
               Products
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
