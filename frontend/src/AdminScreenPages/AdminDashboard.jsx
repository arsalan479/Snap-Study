// src/Pages/AdminDashboard.jsx
import React, { useState } from "react";
import UsersData from "./UsersData";
import Navbar from "../Components/WebComponents/Navbar";
import snapstudylogo from "../assets/WebsiteLogo/snapstudylogo.png";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div
        className={`fixed z-50 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-[#000] transition-transform duration-300 lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="w-10 h-10 m-2">
            <img src={snapstudylogo} className="w-full h-full" alt="logo" />
          </div>
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex flex-col p-6 space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 hover:text-gray-400 transition-colors"
          >
            <i className="ri-dashboard-line"></i> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:text-gray-400 transition-colors"
          >
            <i className="ri-user-3-line"></i> Users
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:text-gray-400 transition-colors"
          >
            <i className="ri-settings-3-line"></i> Settings
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:text-gray-400 transition-colors"
          >
            <i className="ri-logout-box-line"></i> Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Navbar */}
        <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-[#000] shadow-md border-b border-gray-800">
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
          <h2 className="text-base md:text-lg font-semibold">
            Admin Dashboard
          </h2>
          <div className="flex items-center gap-2 md:gap-4">
            <Navbar />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-black">
          <UsersData />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
