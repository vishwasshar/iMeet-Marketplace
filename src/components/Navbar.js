import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { CiLogout, CiUser } from "react-icons/ci";
import Headroom from "react-headroom";
import LoginSignUpModal from "./LoginSignupModal";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { removeAllItems } from "../Redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartListLength = useSelector((state) => state.cart).length;

  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      } else {
        setUsername("");
      }
    });
  });
  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeAllItems());
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {showModal && <LoginSignUpModal showHandler={setShowModal} />}
      <Headroom>
        <div
          className={
            "sticky top-[-2px] z-10 bg-white border-b border-gray-300 ecomm-nav max-w-[1640px] w-full h-[60px] px-[3%] flex flex-col justify-center py-10 duration-300"
          }
        >
          <div className="flex justify-between items-center font-Poppins w-full">
            <Link to={"/"} className="ecomm-icon">
              <h1 className="text-2xl font-bold relative">
                <span className="text-[#ff0e2c]">iMeet</span> Marketplace
              </h1>
            </Link>

            <div className="ecomm-icons">
              <ul className="flex gap-1 sm:gap-3 md:gap-5 font-Poppins">
                <li className="hover:text-[#ff0e2c] flex items-center cursor-pointer">
                  <Link to={"/"} className="text-sm hidden sm:flex">
                    Products
                  </Link>
                </li>
                {!username ? (
                  <li
                    className="hover:text-[#ff0e2c] flex items-center cursor-pointer relative"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <CiUser size={22} />
                    <p className="text-sm hidden sm:flex">Sign In</p>
                  </li>
                ) : (
                  <li
                    className="relative"
                    onMouseEnter={(e) => {
                      !showMenu && setShowMenu(true);
                    }}
                    onMouseLeave={() => {
                      showMenu && setShowMenu(false);
                    }}
                  >
                    <div className="hover:text-[#ff0e2c] flex items-center cursor-pointer">
                      <CiUser size={22} />
                      <p className="text-sm hidden sm:flex">{username}</p>
                    </div>
                    {showMenu && (
                      <div className=" hover:text-[#ff0e2c] cursor-pointer absolute top-5 py-1 bg-transparent min-w-[100px] ">
                        <div
                          onClick={logOut}
                          className="shadow-xl bg-gray-100 my-1 py-2 px-5 w-full rounded-md  flex justify-center items-center"
                        >
                          <CiLogout />
                          Log Out
                        </div>
                      </div>
                    )}
                  </li>
                )}

                <li className="hover:text-[#ff0e2c] flex items-cente cursor-pointer">
                  <Link to="/cart" className="relative ">
                    {cartListLength >0 && (
                      <span className="hidden sm:flex absolute -top-2 -right-2 px-1 font-bold text-sm bg-[#ff0e2c] rounded-full text-white">
                        {cartListLength}
                      </span>
                    )}
                    <BsCart2 size={22} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Headroom>
    </>
  );
};

export default Navbar;
