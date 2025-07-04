import React, { useState } from "react";
import Navbar from "../../Components/WebComponents/Navbar";
import SideBar from "../../Components/WebComponents/SideBar";
import ShinyText from "../../../ReactBits/ShinyText/ShinyText";
import RotatingText from "../../../ReactBits/RotatingText/RotatingText";
import quizcardimage from "../../assets/WebsiteLogo/quizcardimage.png";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import groupstudyimage from "../../assets/WebsiteLogo/group study.png";
import TrueFocus from "../../../ReactBits/TrueFocus/TrueFocus";
import Groups3TwoToneIcon from "@mui/icons-material/Groups3TwoTone";
import QueryBuilderTwoToneIcon from "@mui/icons-material/QueryBuilderTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
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
        className={`${
          isSidebarOpen ? "ml-50" : "ml-0"
        } transition-all duration-300`}
      >
        <section className="flex justify-center items-center h-screen w-full">
          <ShinyText className="text-[9vw] tracking-tighter" text="SnapStudy" />
        </section>

        <section className="text-center pt-5 h-screen w-full">
          <h1 className="text-[3.5vw] flex justify-center tracking-tight items-center">
            Create AI-Powered Quiz Cards For
            <span>
              <div className="ml-2">
                <RotatingText
                  texts={["Scoring", "Student", "Winning", "Success"]}
                  mainClassName="px-2 sm:px-2 md:px-3 tracking-tight bg-[#5227FF] font-extrabold overflow-hidden  justify-center rounded-lg"
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

        <section className="h-auto w-full">
          <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-7xl mx-auto px-5">
            <div className="md:w-1/2 w-full md:mb-0 md:pr-12 flex flex-col items-center justify-center text-center md:text-left md:items-start">
              <h1 className="tracking-tight text-[3.3vw] mb-3 leading-11">
                Collaborate Better With <br /> Group Study
              </h1>
              <p className="text-[1.6vw] tracking-tight leading-6">
                Studying is more effective and more fun when done together.
                SnapStudy’s Group Study feature lets you create or join
                interactive study groups, share AI-generated quiz cards, and
                collaborate on topics in real time. Discuss, challenge, and
                learn from peers — all in one seamless platform!
              </p>
            </div>

            <div className="md:w-1/2 w-full flex justify-center items-center mt-8 md:mt-0">
              <div className="w-full ml-8 max-w-xs md:max-w-md">
                <img
                  src={groupstudyimage}
                  className="h-auto w-full object-cover rounded-2xl shadow-lg"
                  alt="Group Study"
                />
              </div>
            </div>
          </div>
          <TrueFocus
            sentence="True Focus"
            manualMode={false}
            blurAmount={5}
            borderColor="#5227FF"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />

          <div className="mt-8 flex flex-col tracking-tight md:flex-row justify-center gap-6 md:gap-8 py-10 px-4">
            {/* Card 1 */}
            <div className="bg-[var(--bg2)] rounded-2xl p-6 w-full max-w-sm text-start shadow">
              <h2 className="text-lg font-semibold mb-2">
                <span className="mr-2">
                  <Groups3TwoToneIcon />
                </span>
                Create or Join Groups
              </h2>
              <p className="text-sm text-justify">
                Start your own study group or join an existing one with just a
                click. Stay connected with classmates and friends
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#5227FF] rounded-2xl p-6 w-full max-w-sm text-start shadow">
              <h2 className="text-lg font-semibold mb-2">
                <span className="mr-2">
                  <QueryBuilderTwoToneIcon />
                </span>
                Real-time Collaboration
              </h2>
              <p className="text-sm text-justify">
                Discuss topics, solve questions, and collaborate on revisions in
                real time — from anywhere.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[var(--bg2)] rounded-2xl p-6 w-full max-w-sm text-start shadow">
              <h2 className="text-lg font-semibold mb-2">
                <span className="mr-2">
                  <ShareTwoToneIcon/>
                </span>
                Share Quiz Cards</h2>
              <p className="text-sm text-justify">
                Share your AI-generated quiz cards with the group instantly.
                Practice together and challenge each other interactively.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
