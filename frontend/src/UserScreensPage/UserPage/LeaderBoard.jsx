import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";

const LeaderBoard = () => {
  const [postdata, setpostdata] = useState([]);

  useEffect(() => {
    const fetchpostcomp = async () => {
      try {
        const res = await axiosinstance.get("/api/room/compdatafetch");
        console.log(res.data)
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {postdata.length > 0 ? (
        postdata.map((item) => (
          <div
            key={item._id}
            className="bg-[#1F1F1F] p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.userId?.avatar || "https://via.placeholder.com/50"}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
              />
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
    </div>
  );
};

export default LeaderBoard;
