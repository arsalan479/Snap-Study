import React, { useState } from "react";
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from "react-hot-toast";

export const GoogleOTP = () => {
  const [OTP, setOTP] = useState("");

  const handlesumbitOTP = async (e) => {
    e.preventDefault();

    if (!OTP.trim()) {
      toast.error("OTP is required")
      return;
    }

      try {
         const {data} = await toast.promise(
           axiosinstance.post(
          "/auth/magic/verifyemail",
          { code: OTP },
        ),
                {
      loading :"OTP Verified...",
      success:"OTP Verified Successfully!",
        }
        
        
    
         )

      if (data.success && data.redirectURL) {
    
    setTimeout(() => {
      window.location.href = data.redirectURL;
    }, 2000); 
  }
      } catch (err) {
        
if(err.response){
  const {status,data} = err.response

if(status === 401 || status ===400){
  toast.error(data.message)
} 

}

      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handlesumbitOTP}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Verify Your Email
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Enter OTP
        </label>
        <input
          type="text"
          name="code"
          value={OTP}
          onChange={(e) => setOTP(e.target.value)}
          placeholder="Enter your OTP"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};
