import React, { useState, useRef } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// const sitekeyV2 = "6LczM1orAAAAANHnVgjcrv65_juy5_xacZ7Sl8dw"; // Replace with your actual site key

const Googleinput = () => {
  const [email, setEmail] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [password, setpassword] = useState("");
  const [eyepassword, seteyepassword] = useState(false)
  const [validationerrors, setvalidationerrors] = useState([]);
  // const recaptchaRef = useRef(null);


const toogleyepassword = ()=>{
  seteyepassword((prev)=>!prev)
}


  const handleSubmit = async (e) => {
    e.preventDefault();

   

    // const token = recaptchaRef.current?.getValue();

    // if (!token) {
    //   toast.error("Please complete the reCAPTCHA.");
    //   return;
    // }

     try {
    //   // Step 1: Verify reCAPTCHA token
    //   const captchaVerifyRes = await axiosinstance.post(
    //     "/auth/verify-captcha-V2",
    //     { token }
    //   );

    //   if (!captchaVerifyRes.data.success) {
    //     toast.error("reCAPTCHA verification failed.");
    //     return;
    //   }


    

    const registrationRes = await toast.promise(
   axiosinstance.post("/auth/magic/register", { email ,displayName,password }),
  {
    loading:"Register User...",
    success:"User Register Successfully!",
  }
)

      
      
      const data = registrationRes.data;
      
      if (data.success && data.redirectURL) {        
       setTimeout(()=>{
         window.location.href = data.redirectURL         
       },2000)
      }
      
      // recaptchaRef.current.reset(); // Optional: Reset reCAPTCHA after success
      
    } catch (err){
      
      const errors = err.response?.data?.errors
      const message = err.response?.data?.message
      
      // recaptchaRef.current?.reset(); // Reset on error too
    
      if(Array.isArray(errors)){
        errors.forEach((errors)=>toast.error(errors.msg))
      }else{
        toast.error(message)
      }
    
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Signup Form
        </h2>

      
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

<div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Password
          </label>
          <input
            type={eyepassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <span
        onClick={toogleyepassword}
        style={{
          position:"absolute",
          top:"63%",
          left:"65%",
          cursor:"pointer"
        }}
        >
          {
            eyepassword ? <EyeSlashIcon className="h-5 w-5"/> :  <EyeIcon className="h-5 w-5" />
          }
        </span>


        {/* Google reCAPTCHA  */}
        {/* <div className="mb-6">
          <ReCAPTCHA sitekey={sitekeyV2} ref={recaptchaRef} />
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Googleinput;
