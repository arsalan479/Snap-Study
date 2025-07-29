import React, { useState } from "react";
import  GeneralSetting  from "../SettingsComponents/GeneralSetting";
import UserPasswordUpdate from "../../Services/UserPasswordUpdate";
import Plans from "./Plans";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("settings");


  const renderContent = () => {
    switch (activeTab) {
      case "plans":
        return <Plans/>
      case "settings":
        return <GeneralSetting/>;
      case "password":
        return <UserPasswordUpdate/>
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="flex w-[80vw] h-[85vh] rounded-2xl bg-[#2d2d2d] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 sidebarsetting bg-[#1f1f1f]  p-5 flex flex-col gap-4">
        <button
          onClick={() => setActiveTab("settings")}
          className={`text-left cursor-pointer px-4 py-2 rounded-lg ${
            activeTab === "settings" ? "bg-[#444]" : "hover:bg-[#333]"
          }`}
        >
         <span><i className="ri-settings-5-line"></i></span> General Settings
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`text-left px-4 cursor-pointer py-2 rounded-lg ${
            activeTab === "password" ? "bg-[#444]" : "hover:bg-[#333]"
          }`}
        >
        <i className="ri-lock-password-line"></i>  Password Update
        </button>

        <button
          onClick={() => setActiveTab("plans")}
          className={`text-left px-4 py-2 cursor-pointer rounded-lg ${
            activeTab === "plans" ? "bg-[#444]" : "hover:bg-[#333]"
          }`}
        >
        <i class="ri-coupon-3-line"></i>  Plans
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default Settings;
