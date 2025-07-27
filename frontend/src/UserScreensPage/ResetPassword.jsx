import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from "react-hot-toast";
import Bannerlogindesign from "../Utils/Bannerlogindesign.jsx";
import snaplogo from "../assets/WebsiteLogo/snapstudylogo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [eyepassword, seteyepassword] = useState(false);
  const { token } = useParams(); // Get user token from URL
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      if (!newPassword.trim()) {
        toast.error("Password is required");
        return;
      }

      const res = await toast.promise(
        axiosinstance.post(`/auth/magic/resetPasswordById/${token}`, {
          password: newPassword,
        }),
        {
          loading: "Resetting password...",
          success: "Password has been updated successfully!",
        }
      );

      setTimeout(() => {
        navigate("/snapstudylogin");
      }, 2000);
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;

        if (status === 400 && Array.isArray(data.errors)) {
          data.errors.forEach((errors) => {
            toast.error(errors.msg);
          });
        } else if (status === 401) {
          toast.error(data.message);
        } else if (status === 400) {
          toast.error(data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Server not responding. Try again later.");
      }
    }
  };

   const tooglepassword = () => {
    seteyepassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row ">
      <Bannerlogindesign />

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 min-h-screen px-4">
        <div className="w-30 h-30">
          <img src={snaplogo} className="w-full h-full object-cover" alt="" />
        </div>

        <form onSubmit={handleReset} className="p-8 w-full max-w-md">
          <h2 className="text-2xl tracking-tight font-bold mb-4 text-center text-white">
            Create a New Password
          </h2>
          <p className="text-white tracking-tight text-center text-sm md:text-base mb-6">
            Set a strong, secure password to protect your account. Make sure
            it’s unique and easy for you to remember, but hard for others to
            guess.
          </p>
        <div className="relative w-full mt-4">

          <input
            type={eyepassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="button"
            onClick={tooglepassword}
            className="absolute top-4 right-3 text-white cursor-pointer"
          >
            {eyepassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
</div>
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-2xl cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
