import React, { useState } from "react";
import snaplogo from "../../assets/WebsiteLogo/snapstudylogo.png";
import Navbar from "./Navbar";
import MainQuizCardFile from "../../UserScreensPage/QuizCardSystem/MainQuizCardFile";
import QuizCardHistory from "../../Components/UserDashboard/UserDashboardCards";
import SubjectSelect from "../../Components/SubjectSelect";
import FreindsList from "../../UserScreensPage/UserPage/FreindsList";
import MainGroup from "../../UserScreensPage/UserPage/GroupStudy/MainGroup";
import UserCompetionData from "../../UserScreensPage/UserPage/GroupStudy/UserCompetionData";
import Bookmark from "../../UserScreensPage/UserPage/GroupStudy/Bookmark";
import UploadFiles from "../../UserScreensPage/QuizCardSystem/UploadFiles";
import LeaderBoard from "../../UserScreensPage/UserPage/LeaderBoard";

const SideBar2 = () => {
  const [activeLink, setActiveLink] = useState("LeaderBoard");
  const [activeSubject, setActiveSubject] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [quizGenerateSubject, setQuizGenerateSubject] = useState(null);

  const { uniqueSubjects, content: quizCardContent } = QuizCardHistory({
    subject: activeSubject,
  });

  const navItems = ["LeaderBoard", "Quiz Generate", "All Users", "Competion"];
  const libraryItems = ["Competion Data", "BookMark", "Upload Files"];

  const renderSection = () => {
    if (activeLink === "Quiz Generate") {
      return (
        <div>
          <SubjectSelect
            onSelectSubject={(subject) => setQuizGenerateSubject(subject)}
          />
          {quizGenerateSubject && (
            <div className="mt-10">
              <MainQuizCardFile subject={quizGenerateSubject} />
            </div>
          )}
        </div>
      );
    }

    if (activeLink === "QuizCard History") {
      return activeSubject ? (
        quizCardContent
      ) : (
        <div className="text-white text-xl text-center mt-10">
          Select a subject from the dropdown to view your quiz history.
        </div>
      );
    }

    if (activeLink === "All Users") {
      return <FreindsList />;
    }

    if (activeLink === "Competion") {
      return <MainGroup />;
    }

    if (activeLink === "Competion Data") {
      return <UserCompetionData />;
    }

    if (activeLink === "BookMark") {
      return <Bookmark />;
    }
    if (activeLink === "Upload Files") {
      return <UploadFiles />;
    }
    if (activeLink === "LeaderBoard") {
      return <LeaderBoard />;
    }

    return (
      <div className="text-white text-xl text-center mt-10">
        🚧 <strong>{activeLink}</strong> section is under construction.
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-black text-white flex flex-col">
        <div className="p-4">
          <div className="w-10 h-10">
            <img
              src={snaplogo}
              className="h-full w-full object-cover"
              alt="Logo"
            />
          </div>
        </div>



        <nav className="flex-1 px-4 mt-7">
          {/* Main Nav */}
          <div>
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setActiveLink(item);
                  setActiveSubject(null);
                  setIsHistoryOpen(false);
                  setQuizGenerateSubject(null); // reset quizGenerateSubject when switching
                }}
                className={`py-2 mt-1  px-3 ${
                  activeLink === item ? "bg-[var(--bg2)]" : ""
                } text-white hover:bg-[var(--bg2)] tracking-tight rounded-[10px] cursor-pointer`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Library */}
          <div className="mt-6">
            <h3 className="text-gray-400 text-[1.6vw] tracking-tight font-semibold mb-3 px-3">
              Library
            </h3>

            <div>
              {/* QuizCard History */}
              <div
                onClick={() => {
                  setIsHistoryOpen(!isHistoryOpen);
                  setActiveLink("QuizCard History");
                  setActiveSubject(null);
                }}
                className={`py-2 px-3 ${
                  activeLink === "QuizCard History" ? "bg-[var(--bg2)]" : ""
                } text-white hover:bg-[var(--bg2)] rounded-[10px] tracking-tight cursor-pointer`}
              >
                QuizCard History
              </div>

              {/* Dropdown */}
              {isHistoryOpen && (
                <div className="ml-3 mt-2 overflow-auto h-20 subjectsidebar">
                  {uniqueSubjects?.length > 0 ? (
                    uniqueSubjects.map((subject) => (
                      <div
                        key={subject}
                        onClick={() => {
                          setActiveLink("QuizCard History");
                          setActiveSubject(subject);
                        }}
                        className={`py-2 mt-1 px-3 duration-300 ${
                          activeSubject === subject ? "bg-[var(--bg2)]" : ""
                        } text-white hover:bg-[var(--bg2)] font-medium rounded-[6px] tracking-tight cursor-pointer text-[1.6vw]`}
                      >
                        {subject.charAt(0).toUpperCase() + subject.slice(1)}
                      </div>
                    ))
                  ) : (
                    <div className="tracking-tight text-[1.6vw] duration-300 text-gray-400 px-3">
                      No subjects found
                    </div>
                  )}
                </div>
              )}

              {/* Other Library Items */}
              {libraryItems.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setActiveLink(item);
                    setActiveSubject(null);
                    setIsHistoryOpen(false);
                  }}
                  className={`py-2 mt-1 px-3 ${
                    activeLink === item ? "bg-[var(--bg2)]" : ""
                  } text-white hover:bg-[var(--bg2)]  rounded-[10px] tracking-tight cursor-pointer`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full overflow-auto h-screen">
        <div className="bg-black fixed top-0 w-full flex justify-between px-5 items-center h-16 z-20">
          <h1 className="text-lg  text-white">
            {activeLink}
            {activeSubject &&
              ` / ${activeSubject.charAt(0).toUpperCase() + activeSubject.slice(1)}`}
          </h1>
          <Navbar />
        </div>

        <div className="pt-20 px-5">{renderSection()}</div>
      </div>
    </div>
  );
};

export default SideBar2;
