import React, { useState } from "react";
import snaplogo from "../../assets/WebsiteLogo/snapstudylogo.png";
import Navbar from "./Navbar";

const SideBar2 = () => {
  const [activeLink, setActiveLink] = useState("Explore");

  // Sidebar navigation items
  const navItems = [
    "Explore",
    "Images",
    "Videos",
    "Top",
    "Likes",
  ];

  const libraryItems = [
    "My media",
    "Favorites",
    "Uploads",
    "Trash",
    "New folder",
  ];

  return (
    <div className="flex justify-center">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#000] text-white flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <div className="w-10 h-10">
            <img
              src={snaplogo}
              className="h-full w-full object-cover"
              alt="Logo"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-10">
          {/* Main links */}
          <div>
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => setActiveLink(item)}
                className="py-1 px-3 text-white hover:bg-[var(--bg2)] font-semibold tracking-tight rounded-[10px] cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Library */}
          <div className="mt-8">
            <h3 className="text-gray-400 text-[1.6vw] tracking-tight font-semibold mb-3 px-3">
              Library
            </h3>
            <div>
              {libraryItems.map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveLink(item)}
                  className="py-1 px-3 text-white hover:bg-[var(--bg2)] font-semibold rounded-[10px] tracking-tight cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full h-screen">
        <div className=" w-full flex justify-start px-5 items-center h-16">
          <h1 className="text-white text-lg font-semibold mr-4">
            {activeLink}
          </h1>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default SideBar2;
