import React, { useRef, useState } from "react";
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from "react-hot-toast";
import Bannerlogindesign from "../Utils/Bannerlogindesign.jsx";
import snaplogo from "../assets/WebsiteLogo/snapstudylogo.png";

export const GoogleOTP = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        inputRefs.current[index].value = "";
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].value = "";
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("").slice(0, 6);
    setOtp((prev) => {
      const updated = [...prev];
      newOtp.forEach((digit, i) => {
        updated[i] = digit;
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      return updated;
    });

    inputRefs.current[5]?.focus();
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const OTPCode = otp.join("");

    if (!OTPCode.trim() || OTPCode.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const { data } = await toast.promise(
        axiosinstance.post("/auth/magic/verifyemail", { code: OTPCode }),
        {
          loading: "Verifying OTP...",
          success: "OTP Verified Successfully!",
        }
      );

      if (data.success && data.redirectURL) {
        setTimeout(() => {
          window.location.href = data.redirectURL;
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401 || status === 400) {
          toast.error(data.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side: Banner */}
      <Bannerlogindesign />

      {/* Right Side: OTP Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 min-h-screen px-4">
        <div className="w-30 h-30">
          <img src={snaplogo} className="w-full h-full object-cover" alt="" />
        </div>

        <form
          onSubmit={handleSubmitOTP}
          className="shadow-lg rounded-xl p-8 max-w-md w-full "
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Email Verification Required
          </h2>
          <p className="text-white text-center text-sm md:text-base mb-6">
            To complete your login, please enter the 6-digit verification code
            we've sent to your registered email address.
          </p>

          {/* OTP Input Boxes */}
          <div onPaste={handlePaste} className="flex justify-center gap-2 mb-6">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-14 text-center border text-xl rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-2xl cursor-pointer transition-all duration-200 "
          >
            Verify OTP
          </button>

          <p className="text-center mt-3">
            <span className="text-white">Didn't receive the code? </span>
            <span className="text-[var(--Accent)] cursor-pointer hover:underline">
              Resend
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
