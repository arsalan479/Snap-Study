import React, { useState } from "react";
import Navbar from "../../Components/WebComponents/Navbar";
import SideBar from "../../Components/WebComponents/SideBar";

const Home = () => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar isSidebarOpen={isSidebarOpen} />

      <main
        className={`pt-16 ${
          isSidebarOpen ? "ml-50" : "ml-0"
        } transition-all duration-300 p-4`}
      >
        {/* your page content */}
        <h1 className="text-[var(--text)] text-center text-3xl tracking-tight">Welcome to SnapStudy Dashboard</h1>

      </main>
    </div>
  )
}

export default Home;
