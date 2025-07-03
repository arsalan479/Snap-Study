import React from "react";
import snaplogo from "../../assets/WebsiteLogo/snapstudylogo.png";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowOutwardTwoToneIcon from "@mui/icons-material/ArrowOutwardTwoTone";

const SideBar = () => {
  const Links = [
    "SnapStudy Overview",
    "Features",
    "Pricing",
    "Help Center",
    "SnapStudy Log in",
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-green-700 flex flex-col px-4 py-4">
      {/* Logo */}
      <div className="w-16 mb-6">
        <img
          src={snaplogo}
          alt="SnapStudy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Links */}
      <h4 className="text-white text-lg flex items-center mb-4 cursor-pointer">
        <ArrowBackTwoToneIcon style={{ fontSize: 17 }} className="mr-1" />
        Home
      </h4>

      {Links.map((value, index) => (
        <div
          key={index}
          className="group flex items-center text-white hover:bg-green-800 rounded-lg p-2 cursor-pointer"
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
  );
};

export default SideBar;
