import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import Modalrapper from "../../Components/WebComponents/Modalrapper";
import Settings from "../../Components/WebComponents/Setting";

const LeaderBoard = () => {
  const [postdata, setpostdata] = useState([]);
  const [showpopup, setshowpopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    const fetchpostcomp = async () => {
      try {
        const res = await axiosinstance.get("/api/room/compdatafetch");
        console.log(res.data);
        setpostdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchpostcomp();
    // const intervalId = setInterval(() => {
    //   fetchpostcomp();
    // }, 3000);
    // return () => clearInterval(intervalId);
  }, []);

  function handleclick(post) {
    setSelectedPost(post)
    setshowpopup(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {postdata.length > 0 ? (
        postdata.map((item) => (
          <div
            key={item._id}
            className="bg-[#1F1F1F] p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4 relative">
              {/* Avatar */}
              <img
                src={item.userId?.avatar || "https://via.placeholder.com/50"}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
              />

              {/* User Info */}
              <div>
                <h2 className="text-white font-semibold text-lg flex items-center gap-2">
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
                  className="bg-white text-black text-xs sm:text-sm md:text-base px-2 sm:px-3 py-2 rounded-full cursor-pointer flex items-center gap-1"
                >
                  <i className="ri-eye-line"></i>
                </button>
              </div>
            </div>

            {/* Competition Info */}
            <div className="bg-[#2D2D2D] p-4 rounded-xl mb-4">
              <h3 className="text-xl text-white font-bold flex items-center gap-2">
                <i className="ri-trophy-line text-yellow-400"></i>
                {item.compId?.topicName}
              </h3>
              <p className="text-gray-300 mt-1 flex items-center gap-2">
                <i className="ri-bar-chart-2-line text-green-400"></i>
                Level: {item.compId?.levels}
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <i className="ri-star-line text-orange-400"></i>
                Score: {item.compId?.score}/{item.compId?.total}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <i className="ri-time-line"></i>
                {new Date(item.createdAt).toLocaleString()}
              </span>
              <div className="flex gap-4">
                <button className="flex items-center gap-1 hover:text-blue-400 transition">
                  <i className="ri-share-forward-line"></i> Share
                </button>
                <button className="flex items-center gap-1 hover:text-red-400 transition">
                  <i className="ri-heart-line"></i> Like
                </button>
                <button className="flex items-center gap-1 hover:text-green-400 transition">
                  <i className="ri-chat-3-line"></i> Comment
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No posts found 🚀</p>
      )}

 {showpopup && selectedPost && (
  <Modalrapper isOpen={showpopup} onClose={() => setshowpopup(false)}>
    <div className="scrollbarpost bg-[#1F1F1F] p-6 rounded-xl overflow-auto text-white h-170 w-170 space-y-3">
      {selectedPost.compId.quizdatacards.map((item, index) => (
        <div key={index} className="p-4  rounded-lg ">
          
          {/* Question */}
          <h1 className="text-white font-semibold text-lg mb-4">
            {index + 1}. {item.question}
          </h1>

          {/* Options */}
          <div className="space-y-2">
            {item.options.map((option, idx) => {
              const isCorrect = selectedPost.compId.correctedAnswer.includes(option);
              const isWrong = selectedPost.compId.WrongAnswer.includes(option);
              const isRealAnswer = option === item.answer; // real correct answer from quiz

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 
                    ${
                      isCorrect || isRealAnswer
                        ? "bg-green-700"
                        : ""
                    }
                    ${isWrong ? "bg-red-700" : ""}
                    ${
                      !isCorrect && !isWrong && !isRealAnswer
                        ? "bg-[#2D2D2D] "
                        : ""
                    }
                  `}
                >
                  <p className="text-white font-medium">{option}</p>
                  
                  {/* Icon logic */}
                  {isCorrect || isRealAnswer ? (
                    <i className="ri-check-line text-white text-xl"></i>
                  ) : null}
                  {isWrong && <i className="ri-close-line text-white text-xl"></i>}
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
