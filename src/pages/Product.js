import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../Redux/CartSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import LoadingAnim from "../Ball-1s-200px.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const id = useParams().id;
  const [item, setItem] = useState({});
  const itemAddedToast = () =>
    toast("Item Added to Cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [itemStatus, setItemStatus] = useState(false);

  const dispatch = useDispatch();

  const addtocart = (item) => {
    dispatch(addToCart(item));
    itemAddedToast();
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
        setItemStatus(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full h-full">
      <div className=" bg-gray-100 w-full md:h-[600px] h-[1200px] py-[2%] px-[2%] xl:px-[18%] relative">
        {itemStatus ? (
          <>
            <Link
              to={"/"}
              className="flex justify-center items-center absolute top-5 left-10 bg-white p-3 rounded-full hover:scale-125 transition-transform duration-300"
            >
              <AiOutlineArrowLeft size={25} />
            </Link>
            <div className="w-full h-full flex gap-16 flex-col md:flex-row items-center md:justify-between py-[3%]">
              <div className="w-[90%] md:w-[40%] h-[50%] md:h-[90%]">
                <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
                  <img className="p-10" src={item.image} />
                </div>
              </div>
              <div className=" w-[90%] md:w-[50%] md:h-[90%]">
                <div className="w-full h-full flex flex-col gap-5">
                  <h1 className="text-3xl text-gray-800 font-Poppins">
                    {item.title}
                  </h1>
                  <p className="gap-2 capitalize">
                    Category:{" "}
                    <span className="font-extralight">{item.category}</span>
                  </p>
                  <h1 className="text-[25px] text-gray-400">${item.price}</h1>
                  <p>
                    {item?.description?.charAt(0).toUpperCase() +
                      item?.description?.slice(1)}
                  </p>

                  <div className="flex gap-3">
                    <button
                      className="uppercase tracking-tight text-[15px] font-bold text-white bg-[#ff0e2c] rounded-s-full rounded-e-full py-3 text-center px-4 hover:scale-105 duration-300"
                      onClick={() => addtocart(item)}
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[80vh] flex items-center justify-center">
            <img src={LoadingAnim} />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
