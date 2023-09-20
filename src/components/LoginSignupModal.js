import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import googleicon from "../images/google-icon.png";
import github from "../images/github-icons.png";
import fb from "../images/fb-icons.png";

const LoginSignUpModal = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState(0);
  const signUp = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: username,
        });
        signOut(auth).then(
          function () {
            console.log("Signed Out");
          },
          function (error) {
            console.error("Sign Out Error", error);
          }
        );

        setFormType(0);
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      props.showHandler(false);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      props.showHandler(false);
    } catch (err) {
      console.error(err);
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Check your email for a password reset link.");
      props.showHandler(false);
    } catch (err) {
      alert(err.code);
    }
  };

  return (
    <>
      {formType == 1 && (
        <div
          className={
            "z-50 fixed h-full w-full flex items-center justify-center " +
            props.className
          }
        >
          <div
            className="h-[110vh] w-full bg-[#000000aa] backdrop-blur-md absolute cursor-pointer"
            onClick={() => {
              props.showHandler(false);
            }}
          ></div>
          <div className=" w-[90%] sm:w-[60%] md:w-[35%] bg-white absolute rounded-3xl overflow-hidden animate-swipeIn">
            <form
              onSubmit={signUp}
              className="w-full bg-white flex flex-col p-5 sm:p-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-gray-900 text-3xl font-medium title-font">
                  Sign Up
                </h1>
                <AiOutlineClose
                  size={25}
                  onClick={() => {
                    props.showHandler(false);
                  }}
                  className="cursor-pointer hover:scale-125 transition-transform duration-300"
                />
              </div>
              <p className="leading-relaxed mb-2 text-gray-600 max-sm:hidden">
                Unlock Exclusive Deals - Join Us Today!
              </p>
              <div className="relative mb-2">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-2 ">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-2 ">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button
                type="Submit"
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Submit
              </button>
              <div className="flex justify-center">
                <h5>Already have account ? </h5>
                <Link
                  onClick={() => {
                    setFormType(0);
                  }}
                  className="text-black px-1"
                >
                  <h5 className="font-bold"> Login</h5>
                </Link>
              </div>
              <p className=" text-center my-4">OR</p>
              <div className=" flex  items-center justify-center gap-10">
                <button onClick={signInWithGoogle}>
                  <img src={googleicon} alt="" className=" w-[50px]" />
                </button>
                <button>
                  <img src={fb} alt="" className=" w-[45px]" />
                </button>
                <button>
                  <img src={github} alt="" className=" w-[45px]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {formType == 0 && (
        <div
          className={
            "z-50 fixed h-full w-full flex items-center justify-center " +
            props.className
          }
        >
          <div
            className="h-[110vh] w-full bg-[#000000aa] backdrop-blur-md absolute cursor-pointer"
            onClick={() => {
              props.showHandler(false);
            }}
          ></div>
          <div className=" w-[90%] sm:w-[60%] md:w-[35%] bg-white absolute rounded-3xl overflow-hidden animate-swipeIn">
            <form
              onSubmit={signIn}
              className="w-full bg-white flex flex-col p-5 sm:p-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-gray-900 text-3xl font-medium title-font">
                  Login
                </h1>
                <AiOutlineClose
                  size={25}
                  onClick={() => {
                    props.showHandler(false);
                  }}
                  className="cursor-pointer hover:scale-125 transition-transform duration-300"
                />
              </div>
              <p className="leading-relaxed mb-2 text-gray-600 max-sm:hidden">
                Shop More, Login to Explore!
              </p>

              <div className="relative mb-2 ">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-2 ">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <Link
                  onClick={() => setFormType(2)}
                  className=" text-blue-500 "
                >
                  Forgot password
                </Link>
              </div>

              <button
                type="Submit"
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Submit
              </button>
              <div className="flex justify-center">
                <h5>Don't Have An Account ? </h5>
                <Link
                  onClick={() => {
                    setFormType(1);
                  }}
                  className="text-black px-1"
                >
                  <h5 className="font-bold"> Sign Up</h5>
                </Link>
              </div>
              <p className=" text-center my-4">OR</p>
              <div className=" flex  items-center justify-center gap-10">
                <button onClick={signInWithGoogle}>
                  <img src={googleicon} alt="" className=" w-[50px]" />
                </button>
                <button>
                  <img src={fb} alt="" className=" w-[45px]" />
                </button>
                <button>
                  <img src={github} alt="" className=" w-[45px]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {formType == 2 && (
        <div
          className={
            "z-50 fixed h-full w-full flex items-center justify-center " +
            props.className
          }
        >
          <div
            className="h-[110vh] w-full bg-[#000000aa] backdrop-blur-md absolute cursor-pointer"
            onClick={() => {
              props.showHandler(false);
            }}
          ></div>
          <div className=" w-[90%] sm:w-[60%] md:w-[35%] bg-white absolute rounded-3xl overflow-hidden animate-swipeIn">
            <form
              onSubmit={forgotPassword}
              className="w-full bg-white flex flex-col p-5 sm:p-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-gray-900 text-3xl font-medium title-font">
                  Forgot Password
                </h1>
                <AiOutlineClose
                  size={25}
                  onClick={() => {
                    props.showHandler(false);
                  }}
                  className="cursor-pointer hover:scale-125 transition-transform duration-300"
                />
              </div>
              <p className="leading-relaxed mb-2 text-gray-600 max-sm:hidden">
                Get Back to Shopping - Reset Password Now!
              </p>

              <div className="relative mb-2 ">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button
                type="Submit"
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Submit
              </button>
              <div className="flex justify-center py-2">
                <h5>Remember Password? </h5>
                <Link
                  onClick={() => {
                    setFormType(0);
                  }}
                  className="text-black px-1"
                >
                  <h5 className="font-bold"> Login</h5>
                </Link>
              </div>
              <div className="flex justify-center">
                <h5>Don't Have An Account ? </h5>
                <Link
                  onClick={() => {
                    setFormType(1);
                  }}
                  className="text-black px-1"
                >
                  <h5 className="font-bold"> Sign Up</h5>
                </Link>
              </div>
              <p className=" text-center my-4">OR</p>
              <div className=" flex  items-center justify-center gap-10">
                <button onClick={signInWithGoogle}>
                  <img src={googleicon} alt="" className=" w-[50px]" />
                </button>
                <button>
                  <img src={fb} alt="" className=" w-[45px]" />
                </button>
                <button>
                  <img src={github} alt="" className=" w-[45px]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignUpModal;
