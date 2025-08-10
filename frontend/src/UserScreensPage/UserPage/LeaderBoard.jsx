import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import Modalrapper from "../../Components/WebComponents/Modalrapper";
import { motion, AnimatePresence } from "framer-motion";
import HorizontalRuleTwoToneIcon from "@mui/icons-material/HorizontalRuleTwoTone";


const LeaderBoard = () => {
  const [postdata, setpostdata] = useState([]);
  const [showpopup, setshowpopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [arrowPost, setArrowPost] = useState(null);

  useEffect(() => {
    const fetchpostcomp = async () => {
      try {
        const res = await axiosinstance.get("/api/room/compdatafetch");

        // sort data by score (descending)
        const sortedData = res.data.sort(
          (a, b) => b.compId?.score - a.compId?.score
        );

        // add rank to each user
        const rankedData = sortedData.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));

        setpostdata(rankedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchpostcomp();

    const intervalId = setInterval(() => {
      fetchpostcomp();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  function handleclick(post) {
    setSelectedPost(post);
    setshowpopup(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {postdata.length > 0 ? (
        postdata.map((item) => (
          <div
            key={item._id}
            className="bg-[#1F1F1F] p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 relative"
          >
            {/* Rank Badge */}
            <span
              className={`absolute -top-3 -left-3 px-4 py-2 rounded-full  text-sm ${
                item.rank === 1
                  ? "bg-[blue] text-white"
                  : item.rank === 2
                    ? "bg-gray-400 text-white"
                    : item.rank === 3
                      ? "bg-[#8B2607] text-white"
                      : "bg-[#696969] text-white"
              }`}
            >
              <i class="ri-medal-line"></i> {item.rank}
            </span>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-4 relative">
              <img
                src={item.userId?.avatar || "https://via.placeholder.com/50"}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
              />

              <div>
                <h2 className="text-white  text-lg flex items-center gap-2">
                  <i className="ri-user-3-line text-blue-400"></i>
                  {item.userId?.displayName}
                </h2>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <i className="ri-mail-line"></i>
                  {item.userId?.email}
                </p>
              </div>

              {/* View Attempt Button */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleclick(item)}
                  title="View Attempt"
                  className="bg-[#2D2D2D] hover:bg-white hover:text-black duration-300 text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 py-2 rounded-full cursor-pointer flex items-center gap-1"
                >
                  <i className="ri-eye-line"></i>
                </button>
              </div>
            </div>

            {/* Competition Info */}
            <div className="bg-[#2D2D2D] p-4 rounded-xl mb-4">
              <h3 className="capitalize text-xl text-white  flex items-center gap-2">
                <i className="text-yellow-500 ri-hashtag"></i>
                {item.compId?.topicName}
              </h3>
              <p className="text-gray-300 capitalize mt-1 flex items-center gap-2">
                <i className="ri-bar-chart-2-line text-green-400"></i>
                Level: {item.compId?.levels}
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <i className="text-red-400 ri-flag-line"></i> 
                Score: {item.compId?.score}/
                {item.compId?.total}
              </p>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center text-gray-400  text-md">
              <span className="flex items-center gap-1 mb-4">
                <i className="ri-time-line"></i>
                {new Date(item.createdAt).toLocaleString()}
              </span>

              {/* Arrow Icon */}
              <button
                onClick={() =>
                  setArrowPost((prev) =>
                    prev && prev._id === item._id ? null : item
                  )
                }
                className="flex items-center justify-center w-10 h-10 bg-[#2D2D2D] rounded-full hover:bg-white hover:text-black duration-300  transition"
              >
                <i
                  className={`cursor-pointer ri-arrow-down-s-line text-xl ${
                    arrowPost && arrowPost._id === item._id ? "rotate-180" : ""
                  } transition-transform`}
                ></i>
              </button>

              {/* Message Box with Animation */}
              <AnimatePresence>
                {arrowPost && arrowPost._id === item._id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-[16px] leading-8 text-white px-4 py-2 text-start"
                  >
                    <h1 className="text-2xl mb-3">
                      <span>
                        <i className="text-[20px] text-[#3468f5] ri-chat-1-line"></i>
                      </span>{" "}
                      Caption
                    </h1>
                    {item.message || "No message available"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 font-semibold text-2xl flex justify-center items-center h-[60vh] w-full capitalize">Nothing to see here <HorizontalRuleTwoToneIcon/> post</p>
      )}

      {/* Popup Modal */}
      {showpopup && selectedPost && (
        <Modalrapper isOpen={showpopup} onClose={() => setshowpopup(false)}>
          <div className="scrollbarpost bg-[#1F1F1F] p-6 rounded-xl overflow-auto text-white h-170 w-170 space-y-3">
            {selectedPost.compId.quizdatacards.map((item, index) => (
              <div key={index} className="p-4 rounded-lg">
                {/* Question */}
                <h1 className="text-white  text-lg mb-4">
                  {index + 1}. {item.question}
                </h1>

                {/* Options */}
                <div className="space-y-2">
                  {item.options.map((option, idx) => {
                    const isCorrect =
                      selectedPost.compId.correctedAnswer.includes(option);
                    const isWrong =
                      selectedPost.compId.WrongAnswer.includes(option);
                    const isRealAnswer = option === item.answer;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 
                          ${isCorrect || isRealAnswer ? "bg-green-700" : ""}
                          ${isWrong ? "bg-red-700" : ""}
                          ${
                            !isCorrect && !isWrong && !isRealAnswer
                              ? "bg-[#2D2D2D]"
                              : ""
                          }
                        `}
                      >
                        <p className="text-white ">{option}</p>
                        {isCorrect || isRealAnswer ? (
                          <i className="ri-check-line text-white text-xl"></i>
                        ) : null}
                        {isWrong && (
                          <i className="ri-close-line text-white text-xl"></i>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Modalrapper>
      )}
    </div>
  );
};

export default LeaderBoard;
