import React, { useEffect, useState } from "react";
import Navbar from "../../Components/WebComponents/Navbar";
import SideBar from "../../Components/WebComponents/SideBar";
import ShinyText from "../../../ReactBits/ShinyText/ShinyText";
import RotatingText from "../../../ReactBits/RotatingText/RotatingText";
import quizcardimage from "../../assets/WebsiteLogo/quizcardimage.png";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import quizfeature from "../../assets/WebsiteLogo/quizfeature.png";
import quizcardimage2 from "../../assets/WebsiteLogo/quizcardimage2.png";
import savehistory from "../../assets/WebsiteLogo/savehistory.jpg";
import FallingText from "../../../ReactBits/FallingText/FallingText";

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
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    const msgToShow = message || error;

    if (msgToShow) {
      toast.error(msgToShow);

      // Clean the URL
      window.history.replaceState({}, "", window.location.pathname);
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

          <p className="pl-20 pt-1 text-[1.6vw] leading-6 pr-20 t">
            Upload your notes as images and let AI transform them into
            interactive quiz cards. Learn smarter, revise faster, and compete
            with friends all in one platform.
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

        <section className="h-auto w-full bg-black mt-10 text-white ">
          <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Side - Content */}
            <div>
              <h1 className="text-5xl font-semibold mb-8">
                How It <span className="text-[var(--primary)]">Works</span>
              </h1>

              {/* Step 1 */}
              <div className="flex items-start mb-8">
                <i className="ri-camera-line text-4xl text-[var(--primary)]"></i>
                <div className="ml-4">
                  <h2 className="text-3xl">Upload Your Notes</h2>
                  <p className="mt-2 text-md">
                    Snap a photo of your notes (JPG, PNG, JPEG) <br /> and
                    upload.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start mb-8">
                <i className="ri-bard-line text-4xl text-[var(--primary)]"></i>
                <div className="ml-4">
                  <h2 className="text-3xl">AI Creates Quiz Cards</h2>
                  <p className="mt-2 text-md">
                    AI instantly generates question cards from your uploaded
                    notes.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <i className="ri-brain-line text-4xl text-[var(--primary)]"></i>
                <div className="ml-4">
                  <h2 className="text-3xl ">Learn & Compete</h2>
                  <p className="mt-2 text-md">
                    Save your quiz cards or test your knowledge in competition
                    mode.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image Placeholder */}
            <div className="f">
              <div className="w-full h-96 bg-gray-700 flex items-center justify-center rounded-xl">
                <img
                  src={quizcardimage}
                  className="w-full h-full overflow-hidden object-cover rounded-xl "
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full h-auto pt-[6vw] pb-[4vw]">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl tracking-tight mb-5 flex items-center gap-2">
                <i className="text-[var(--primary)] ri-megaphone-line"></i>
                Your Quiz Powered by AI
              </h1>
              <p className="text-md leading-relaxed">
                Select your subject, upload topic notes, and let AI create quiz
                cards for you. Save, bookmark, or get them read aloud with
                text-to-speech for effortless learning.
              </p>
            </div>

            {/* Right Image */}
            <div className="w-full h-84 flex items-center justify-center rounded-xl overflow-hidden">
              <img
                src={quizfeature}
                className="w-full h-full object-cover"
                alt="Quiz Feature Preview"
              />
            </div>
          </div>
        </section>

        <section className="w-full h-auto pb-[4vw]">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side */}
            <div className="w-full h-84 flex items-center justify-center overflow-hidden">
              <img
                src={quizcardimage2}
                className="w-full h-full object-cover"
                alt="Quiz Feature Preview"
              />
            </div>

            {/* Right side */}
            <div>
              <h1 className="text-4xl tracking-tight mb-5 flex items-center gap-2">
                <i className="text-[var(--primary)] ri-megaphone-line"></i>
                Climb the Leaderboard
              </h1>
              <p className="text-md leading-relaxed">
                Choose a topic, set difficulty, and answer MCQs generated from
                your notes. Submit your answers, see your score instantly, and
                compete for top positions on the leaderboard.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full h-auto pt-12 flex ">
          <div className="text-center w-full">
            <h1 className="text-4xl">
              <span>
                <i className="text-[var(--primary)] ri-folder-5-line"></i>
              </span>{" "}
              All Your Learning Organized and Accessible
            </h1>
            <p className="px-20 pt-3 text-[1.6vw] leading-6">
              Keep track of your saved quiz cards and competitions. Your private
              history ensures you can revisit topics anytime, subject-wise.
            </p>

            {/* Image Container */}
            <div className="flex justify-center mt-6">
              <img
                src={savehistory}
                className="w-[800px] h-[450px] object-cover rounded-2xl"
                alt="Save History Preview"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
