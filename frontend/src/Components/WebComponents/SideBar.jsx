import React from "react";
import snaplogo from "../../assets/WebsiteLogo/snapstudylogo.png";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowOutwardTwoToneIcon from "@mui/icons-material/ArrowOutwardTwoTone";
import SyncAltTwoToneIcon from "@mui/icons-material/SyncAltTwoTone";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const Links = [
    "SnapStudy Overview",
    "Features",
    "Pricing",
    "Help Center",
    "SnapStudy Log in",
  ];

  return (
    <>
      {/* Logo and menu toggle - Fixed outside sidebar */}
      <div className="fixed top-3 left-3 z-50 flex items-center gap-10">
        <div className="w-10 h-10">
          <img
            src={snaplogo}
            alt="SnapStudy"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={toggleSidebar}
          className="text-[var(--text)] cursor-pointer"
        >
          <SyncAltTwoToneIcon style={{ fontSize: 25 }} />
        </button>
      </div>

      {/* Sidebar content */}
      <div
        className={`fixed top-0  h-screen bg-[var(--background)]  ${
          isOpen ? "w-50" : "w- "
        } bg-[var(--background)]  flex flex-col  py-3 pt-16 transition-all duration-300`}
      >
        {/* Links */}
        {isOpen && (
          <div className="flex-1 flex flex-col pl-3 justify-center space-y-1 ">
            <h4 className="home text-[var(--text2)] text-[1.5vw] flex items-center cursor-pointer">
              <ArrowBackTwoToneIcon
                style={{ fontSize: 17 }}
                className="arrow mr-1"
              />
              Home
            </h4>

            {Links.map((value, index) => (
              <div
                key={index}
                className={`group flex items-center text-[var(--text)] text-[1.5vw] rounded-lg p-2 cursor-pointer
      ${index === 0 ? "bg-[var(--bg2)]" : "hover:bg-[var(--bg2)]"}
    `}
              >
                <span>{value}</span>

                {(index === 3 || index === 4) && (
                  <ArrowOutwardTwoToneIcon
                    style={{ fontSize: 17 }}
                    className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-px transition"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
