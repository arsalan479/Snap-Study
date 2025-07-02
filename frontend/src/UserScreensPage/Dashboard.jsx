import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosinstance } from "../AxiosInstance/axios";
import SubjectSelect from "../Components/SubjectSelect";
import PopupSureUpdate from "../Utils/PopupSureUpdate";

const Dashboard = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const name = params.get("name");

    if (success === "true" && name) {
      toast.success(`Welcome back ${name}`, { id: "welcome-toast" });
      localStorage.setItem("userName", name);
      setUserName(name);

      window.history.replaceState({}, document.title, location.pathname);
    } else {
      const savedName = localStorage.getItem("userName");
      if (savedName) {
        setUserName(savedName);
      }
    }
  }, [location]);

  const logouthandle = async () => {
    try {
      const response = await axiosinstance.get("/auth/magic/logout");
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("Logout successful!");
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    // <div className='bg-[whitesmoke] w-full h-[200vh]'>
    //   <img className='w-30 h-30' src={logo} alt="logo" />

    <div>
      <PopupSureUpdate />
      <SubjectSelect />

      <button
        onClick={logouthandle}
        className="cursor-pointer px-5 py-2 rounded-2xl ml-20 bg-[#CA3904] text-white"
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
