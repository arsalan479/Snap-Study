import React, { useEffect, useState } from "react";
import Navbar from "../../Components/WebComponents/Navbar";
import SideBar from "../../Components/WebComponents/SideBar";
import ShinyText from "../../../ReactBits/ShinyText/ShinyText";
import RotatingText from "../../../ReactBits/RotatingText/RotatingText";
import quizcardimage from "../../assets/WebsiteLogo/quizcardimage.jpg";
import groupstudyimage from "../../assets/WebsiteLogo/group study.png";
import TrueFocus from "../../../ReactBits/TrueFocus/TrueFocus";
import Groups3TwoToneIcon from "@mui/icons-material/Groups3TwoTone";
import QueryBuilderTwoToneIcon from "@mui/icons-material/QueryBuilderTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import FallingText from '../../../ReactBits/FallingText/FallingText'

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const name = params.get("name");

    if (success === "true" && name) {
      toast.success(`Welcome back ${name}`, { id: "welcome-toast" });
      localStorage.setItem("userName", name);
      setUserName(name);

      window.history.replaceState({}, document.title, location.pathname);
    } else {
      const savedName = localStorage.getItem("userName");
      if (savedName) {
        setUserName(savedName);
      }
    }
  }, [location]);


   useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get('error');
    const message = searchParams.get('message');
  
    const msgToShow = message || error;
  
    if (msgToShow) {
      toast.error(msgToShow);
  
      // Clean the URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);
  
  return (
    <div>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar isSidebarOpen={isSidebarOpen} />

      <main
        className={`${
          isSidebarOpen ? "ml-50" : "ml-0"
        } transition-all duration-300`}
      >
        <section className="relative h-screen w-full flex justify-center items-center overflow-hidden">
         

          {/* Text in center */}
          <ShinyText
            className="text-[9vw] tracking-tighter "
            text="SnapStudy"
          />
        </section>

        <section className="text-center pt-5 h-screen w-full">
          <h1 className="text-[3.5vw] flex justify-center tracking-tight items-center">
            Create AI-Powered Quiz Cards For
            <span>
              <div className="ml-2">
                <RotatingText
                  texts={["Scoring", "Student", "Winning", "Success"]}
                  mainClassName="px-2 sm:px-2 md:px-3 tracking-tight bg-[var(--primary)]  font-extrabold overflow-hidden  justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </span>
          </h1>

          <p className="pl-20 pt-1 text-[1.7vw] leading-6 pr-20 tracking-tight">
            Just enter your topic Image, and SnapStudy instantly generates
            interactive cards — perfect for revision and self-practice!
          </p>
          <div className="flex justify-center mt-8">
            <div className="w-[70vw] h-[40vw]">
              <img
                src={quizcardimage}
                className=" w-full rounded-2xl h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </section>


<section className="h-screen w-full bg-yellow-400">

</section>

       

        
      </main>
    </div>
  );
};

export default Home;
