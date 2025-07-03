import React from "react";

const Navbar = ({ isSidebarOpen }) => {
  return (
    <header
      className={`fixed top-0 ${
        isSidebarOpen ? "left-50" : "left-0"
      } right-0 bg-[var(--background)] h-16 flex items-center justify-end px-6 text-white z-10 transition-all duration-300`}
    >
      <button className="bg-blue-900 px-4 py-1 rounded">Log in</button>
    </header>
  );
};

export default Navbar;
