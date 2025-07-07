import React from "react";
import SubjectSelect from "../Components/SubjectSelect";
import PopupSureUpdate from "../Utils/PopupSureUpdate";

const Dashboard = () => {



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
