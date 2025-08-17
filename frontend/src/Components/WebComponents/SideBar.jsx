import React from "react";
import { Link } from "react-router-dom";
import snaplogo from "../../assets/WebsiteLogo/snapstudylogo.png";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowOutwardTwoToneIcon from "@mui/icons-material/ArrowOutwardTwoTone";

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Logo and menu toggle - Fixed outside sidebar */}
      <div className="fixed top-3 left-3 z-50 flex items-center gap-30">
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
          <i className="text-xl ri-sidebar-fold-line"></i>
        </button>
      </div>

      {/* Sidebar content */}
      <div
        className={`fixed top-0 h-screen bg-[var(--background)] ${
          isOpen ? "w-50" : "w- "
        } flex flex-col py-3 pt-16 transition-all duration-300`}
      >
        {isOpen && (
          <div className="flex-1 flex flex-col pl-3 justify-center space-y-1">
            <h4 className="home text-[var(--text2)] text-[1.5vw] flex items-center cursor-pointer">
              <ArrowBackTwoToneIcon
                style={{ fontSize: 17 }}
                className="arrow mr-1"
              />
              <Link to={"/home"}>Home</Link>
            </h4>

            {/* Buttons individually written */}
            <div className="group flex items-center text-[var(--text)] text-[1.5vw] rounded-lg p-2 cursor-pointer bg-[var(--bg2)]">
              <span>SnapStudy Overview</span>
            </div>

            <div className="group flex items-center text-[var(--text)] text-[1.5vw] rounded-lg p-2 cursor-pointer hover:bg-[var(--bg2)]">
              <span>Features</span>
            </div>

            <div className="group flex items-center text-[var(--text)] text-[1.5vw] rounded-lg p-2 cursor-pointer hover:bg-[var(--bg2)]">
              <span>Pricing</span>
            </div>

            <div className="group flex items-center text-[var(--text)] text-[1.5vw] rounded-lg p-2 cursor-pointer hover:bg-[var(--bg2)]">
              <a href="https://github.com/arsalan479/Snap-Study" target="_blank" rel="noopener noreferrer">Help Center</a>
              <ArrowOutwardTwoToneIcon
                style={{ fontSize: 17 }}
                className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-px transition"
              />
            </div>

            <Link
              to="/snapstudylogin"
              className="group flex items-center text-[var(--text)] text-[1.5vw] rounded-lg p-2 cursor-pointer hover:bg-[var(--bg2)]"
            >
              <span>SnapStudy Log in</span>
              <ArrowOutwardTwoToneIcon
                style={{ fontSize: 17 }}
                className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-px transition"
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
