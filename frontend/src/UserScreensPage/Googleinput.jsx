import React, { useState } from "react";
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Bannerlogindesign from "../Utils/Bannerlogindesign.jsx";

const Googleinput = () => {
  const [email, setEmail] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [password, setpassword] = useState("");
  const [comparepassword, setcomparepassword] = useState("");
  const [eyepassword, seteyepassword] = useState(false);

  const toogleyepassword = () => {
    seteyepassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registrationRes = await toast.promise(
        axiosinstance.post("/auth/magic/register", {
          email,
          displayName,
          password,
          confirmPassword: comparepassword,
        }),
        {
          loading: "Register User...",
          success: "User Register Successfully!",
        }
      );

      const data = registrationRes.data;

      if (data.success && data.redirectURL) {
        setTimeout(() => {
          window.location.href = data.redirectURL;
        }, 2000);
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = err.response?.data?.message;

      if (Array.isArray(errors)) {
        errors.forEach((errors) => toast.error(errors.msg));
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div className="h-screen flex bg-black">
      {/* Left Image Section — hidden on screens smaller than lg */}
      <Bannerlogindesign />

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-black p-8 rounded-xl shadow-xl"
        >
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white   mb-2">
              Create Your Account
            </h1>
            <p className="text-white text-sm">
              Join us today and access exclusive features!
            </p>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm  text-white mb-1">
              <i className="ri-user-line mr-1"></i> Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={displayName}
              onChange={(e) => setdisplayName(e.target.value)}
              required
              className="w-full px-4 py-2 text-white border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm  text-white mb-1">
              <i className="ri-mail-line mr-1"></i> Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 text-white py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm  text-white mb-1">
              <i className="ri-lock-password-line mr-1"></i> Password
            </label>
            <input
              type={eyepassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="w-full px-4 text-white py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="********"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm  text-white mb-1">
              <i className="ri-lock-password-line mr-1"></i> Confirm Password
            </label>
            <input
              type={eyepassword ? "text" : "password"}
              name="password"
              value={comparepassword}
              onChange={(e) => setcomparepassword(e.target.value)}
              required
              className="w-full px-4 text-white py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="********"
            />
            <div className="mt-4">
              <input type="checkbox" onClick={toogleyepassword} name="" id="" />
              <span className="ml-2">Show Password</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black cursor-pointer py-3 rounded-2xl  transition duration-200 "
          >
            Register on SnapStudy
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to={"/snapstudylogin"}>
              <a
                href="#"
                className="text-white hover:border-b duration-300 font-medium"
              >
                Login
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Googleinput;
