import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingAnim from "../Ball-1s-200px.svg";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";

function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productStatus, setProductStatus] = useState(false);

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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setProductStatus(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const addtocart = (item) => {
    dispatch(addToCart(item));
    itemAddedToast();
  };

  return (
    <div className="md:pl-3 py-5">
      <h1 className="text-[27px] text-gray-500 font-semibold tracking-wide text-center">
        All Products
      </h1>
      {productStatus ? (
        <></>
      ) : (
        <div className="h-[80vh] flex items-center justify-center">
          <img src={LoadingAnim} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 mt-[50px] overflow-hidden ">
        {products.map((item) => {
          return (
            <div
              data-aos="fade-up"
              data-aos-duration={500 * (item.id % 2)}
              data-aos-delay={200 * (item.id % 2)}
              key={item.id}
              className="sm:w-[420px] mx-auto border-2 bg-white border-gray-100 overflow-hidden rounded-lg relative flex justify-center hover:scale-105 duration-300 "
            >
              <div className="flex flex-col w-full h-full">
                <div className="overflow-hidden rounded-lg flex items-end h-52 w-full px-20">
                  <img className="object-cover" src={item.image} />
                </div>
                <div className=" h-[60%] flex flex-col justify-center pt-10 px-6">
                  <h1 className="text-[20px] mb-6 font-semibold">
                    {item.title.substring(0, 30)}
                    {item.title.length > 30 ? "..." : ""}
                  </h1>
                  <p>{item.description.substring(0, 100)}</p>
                  <div className="flex justify-between items-center px-1 py-3">
                    <p className="font-semibold text-2xl text-center gap-2">
                      $ {item.price.toFixed(2)}
                    </p>
                    <p className="text-center gap-2 capitalize">
                      Category: {item.category}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <Link
                      to={`/product/${item.id}`}
                      className="py-2 flex justify-center items-center bg-[#ff0e2c] text-white rounded-md"
                    >
                      View Details
                    </Link>
                    <button
                      className="py-2 flex justify-center items-center bg-[#209651] text-white rounded-md"
                      onClick={() => addtocart(item)}
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Products;
