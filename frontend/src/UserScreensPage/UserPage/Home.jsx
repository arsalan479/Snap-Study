import React, { useState } from "react";
import Navbar from "../../Components/WebComponents/Navbar";
import SideBar from "../../Components/WebComponents/SideBar";
import picture from "../../assets//LoginImages/loginimage.png";
import ShinyText from "../../../assets/ShinyText/ShinyText";

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
        className={` ${
          isSidebarOpen ? "ml-50" : "ml-0"
        } transition-all duration-300 flex justify-center items-center min-h-screen`}
      >
        <div>
          <ShinyText className="text-8xl tracking-tighter" text="SnapStudy"/>
        </div>
      </main>
    </div>
  );
};

export default Home;
