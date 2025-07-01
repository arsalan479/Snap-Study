import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams(); // Get user token from URL
  const navigate = useNavigate();

const handleReset = async (e) => {
  e.preventDefault();
  try {
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
      navigate("/googlelogin");
    }, 2000);
  } catch (err) {
       

    if (err.response) {
      const {status,data}=err.response;

      if (status === 400 && Array.isArray(data.errors)) {
          data.errors.forEach((errors)=>{
            toast.error(errors.msg)
          })

      } else if (status === 401) {
        toast.error(data.message);
      }else if(status === 400){
        toast.error(data.message)
      }
       else {
        toast.error("Something went wrong. Please try again.");
      }
    } 
    else {
      toast.error("Server not responding. Try again later.");
    }

  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleReset}
        className="bg-white shadow-md rounded p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h2>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Reset Password
        </button>

       
      </form>
    </div>
  );
};

export default ResetPassword;
