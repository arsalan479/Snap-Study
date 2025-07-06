import React, { useEffect, useState } from "react";
import Navbar from "../../Components/WebComponents/Navbar";
import SideBar from "../../Components/WebComponents/SideBar";
import ShinyText from "../../../ReactBits/ShinyText/ShinyText";
import RotatingText from "../../../ReactBits/RotatingText/RotatingText";
import quizcardimage from "../../assets/WebsiteLogo/quizcardimage.png";
import groupstudyimage from "../../assets/WebsiteLogo/group study.png";
import TrueFocus from "../../../ReactBits/TrueFocus/TrueFocus";
import Groups3TwoToneIcon from "@mui/icons-material/Groups3TwoTone";
import QueryBuilderTwoToneIcon from "@mui/icons-material/QueryBuilderTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import Ballpit from "../../../ReactBits/Ballpit/Ballpit";
import classImage from "../../assets/WebsiteLogo/class.png";
import TextPressure from "../../../ReactBits/TextPressure/TextPressure";
import ArrowOutwardTwoToneIcon from "@mui/icons-material/ArrowOutwardTwoTone";
import studyimage from "../../assets/WebsiteLogo/audio.png";
import FallingText from "../../../ReactBits/FallingText/FallingText";
import price from "../../assets/WebsiteLogo/price.png";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

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
          {/* Ballpit in the background */}
          <Ballpit
            count={170}
            gravity={0.5}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={true}
            colors={[0xffffff, 0x5227ff, 0x222222]}
            className="absolute inset-0 z-0"
          />

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
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />

          <div className="mt-8 flex flex-col tracking-tight md:flex-row justify-center gap-6 md:gap-8 py-10 px-4">
            {/* Card 1 */}
            <div className="bg-[var(--bg2)] rounded-2xl p-6 w-full max-w-sm text-start shadow">
              <h2 className="text-lg leading-6 mb-2">
                <span className="mr-2">
                  <Groups3TwoToneIcon />
                </span>
                Create or Join Groups
              </h2>
              <ul>
                <li className="text-sm text-justify">
                  Start your own study group or join an existing one with just a
                  click. Stay connected with classmates and friends
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-[var(--primary)]  rounded-2xl p-6 w-full max-w-sm text-start shadow">
              <h2 className="text-lg leading-6 mb-2">
                <span className="mr-2">
                  <QueryBuilderTwoToneIcon />
                </span>
                Real-time Collaboration
              </h2>
              <ul>
                <li className="text-sm text-justify">
                  Discuss topics, solve questions, and collaborate on revisions
                  in real time — from anywhere.
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-[var(--bg2)] rounded-2xl p-6 w-full max-w-sm text-start shadow">
              <h2 className="text-lg mb-2">
                <span className="mr-2">
                  <ShareTwoToneIcon />
                </span>
                Share Quiz Cards
              </h2>
              <ul>
                <li className="text-sm text-justify">
                  Share your AI-generated quiz cards with the group instantly.
                  Practice together and challenge each other interactively.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="h-auto w-full overflow-hidden mt-10 flex flex-col items-center justify-center gap-10">
          <div
            style={{ position: "relative" }}
            className="h-30 w-100 flex items-center justify-center"
          >
            <TextPressure
              text="Explore!"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#5227FF"
              minFontSize={10}
            />
          </div>

          <div className="flex justify-center gap-6">
            <div>
              <div className="bg-[var(--bg2)] w-[27vw] h-[27vw] rounded-2xl">
                <div className="p-5">
                  <h1 className="tracking-tight text-start text-[2vw] leading-7 capitalize">
                    Interactive AI-Powered Assistance in Your Classroom
                  </h1>
                  <ul>
                    <li className="tracking-tight text-start text-[1.4vw] leading-5 mt-6">
                      At SnapStudy, we don’t just connect you to your classroom
                      — we enhance your learning. Alongside joining your
                      classroom, you can interact with our intelligent
                      assistant.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 bg-[var(--primary)] w-[27vw] h-[27vw] rounded-2xl">
                <div className="p-5">
                  <h1 className="tracking-tight text-start text-[2vw] leading-7 capitalize">
                    Collaborative Learning with AI Support
                  </h1>
                  <ul>
                    <li className="tracking-tight text-start text-[1.4vw] leading-5 mt-6">
                      At SnapStudy, learning becomes more collaborative and
                      effective. Our platform lets up to 4 users join and chat
                      together in the same classroom session, making it easy to
                      discuss ideas, solve problems as a group, and share
                      knowledge in real-time.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-[40vw] h-[55vw] rounded-2xl">
              <img
                src={classImage}
                className="h-full w-full rounded-2xl"
                alt=""
              />
            </div>
          </div>
          <div>
            <button className="tracking-tight cursor-pointer text rounded-full text-[1.8vw] px-8 py-3 bg-[var(--primary)]">
              Get Started
              <span>
                <ArrowOutwardTwoToneIcon className="arrow2" />
              </span>
            </button>
          </div>
        </section>

        <section className="flex justify-center items-center h-screen w-full">
          <div className="flex flex-col items-center">
            <h1 className="text-[3.3vw] text-center tracking-tight">
              Speak & Learn Effortlessly
            </h1>
            <ul>
              <li className="text-[1.6vw] px-15 leading-6 text-center tracking-tight">
                With Snap Study Voice Input and Audio Explanation, just say your
                question and hear the answer. No typing, no hassle just seamless
                hands free learning that fits your style.
              </li>
            </ul>
            <div className="w-[60vw] h-[40vw] flex justify-center">
              <img
                src={studyimage}
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
          </div>
        </section>

        <section className="h-auto w-full ">
          <div>
            <h1 className="text-[3.3vw] text-center tracking-tight">Pricing</h1>
            <div className="flex justify-center mt-9 gap-10">
              <div className="rounded-2xl w-90 border border-[var(--bg2)] h-auto">
                <div className="w-full h-55">
                  <img
                    src={price}
                    className="h-full w-full object-cover rounded-t-2xl"
                    alt=""
                  />
                </div>
                <div className="p-4">
                  <h1 className="tracking-tight text-[2.5vw]">
                    SnapStudy Free
                  </h1>
                  <p className="mt-3 tracking-tight leading-6 text-[1.5vw]">
                    <span className="font-semibold">Free</span> includes the
                    ability to explore your creativity AI Interaction
                  </p>
                  <ol className="mt-3">
                    {[
                      "Generate up to 50 QuizCards per 24 hours",
                      " Chat with AI 100 messages per day",
                      " Collaborate with up to 2 group study members",
                      "Absolutely free of cost no hidden charges",
                    ].map((value, key) => (
                      <li
                        key={key}
                        className="leading-9 text-[1.5vw] tracking-tight"
                      >
                        <span>
                          <DoneTwoToneIcon style={{ fontSize: 22 }} />
                        </span>
                        {value}
                      </li>
                    ))}
                  </ol>
                  <div>
                    <h1 className="relative top-3 text-[1.5vw]">$0 /month</h1>
                    <button className="px-4 py-3 text-[1.5vw] bg-white text-black rounded-full mt-5">
                      Get Free
                      <span>
                        <ArrowOutwardTwoToneIcon style={{ fontSize: 17 }} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl w-90 border border-[var(--bg2) h-auto">
                <div className="w-full h-55">
                  <img
                    src={price}
                    className="h-full w-full object-cover rounded-t-2xl"
                    alt=""
                  />
                </div>
                <div className="p-4">
                  <h1 className="tracking-tight text-[2.5vw]">
                    SnapStudy Plus
                  </h1>
                  <p className="mt-3 tracking-tight leading-6 text-[1.5vw]">
                    <span className="font-semibold">Plus</span> includes faster
                    generations and the high exploration
                  </p>
                  <ol className="mt-3">
                    {[
                      "Generate up to 50 QuizCards per 24 hours",
                      " Chat with AI 100 messages per day",
                      " Collaborate with up to 2 group study members",
                      "Absolutely free of cost no hidden charges",
                    ].map((value, key) => (
                      <li
                        key={key}
                        className="leading-9 text-[1.5vw] tracking-tight"
                      >
                        <span>
                          <DoneTwoToneIcon style={{ fontSize: 22 }} />
                        </span>
                        {value}
                      </li>
                    ))}
                  </ol>
                  <div>
                    <h1 className="relative top-3 text-[1.5vw]">$50 /month</h1>
                    <button className="px-4 py-3 text-[1.5vw] bg-white text-black rounded-full mt-5">
                      Get Plus
                      <span>
                        <ArrowOutwardTwoToneIcon style={{ fontSize: 17 }} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
