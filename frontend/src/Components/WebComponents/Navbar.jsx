import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-60 right-0 bg-blue-700 h-16 flex items-center justify-between px-6 text-white z-10">
      <button className="bg-blue-900 px-4 py-1 rounded">Log in</button>
    </header>
  );
};

export default Navbar;
