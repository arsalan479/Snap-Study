import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast from "react-hot-toast";
import HorizontalRuleTwoToneIcon from "@mui/icons-material/HorizontalRuleTwoTone";
import { Modal, Input } from "antd";

const UserCompetionData = () => {
  const [compdata, setCompData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sharedPosts, setSharedPosts] = useState({});
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const checkSharedPosts = async () => {
      try {
        const results = {};
        for (const comp of compdata) {
          const res = await axiosinstance.get(`/api/room/userpost/${comp._id}`);
          results[comp._id] = res.data.length > 0;
        }
        setSharedPosts(results);
      } catch (error) {
        console.error("Error checking posts:", error);
      }
    };

    if (compdata.length > 0) {
      checkSharedPosts();
    }

    const intervalId = setInterval(() => {
      checkSharedPosts();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [compdata]);

  const opendeletemodel = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const closedeletemodel = () => {
    setDeleteModalOpen(false);
  };

  const opensharemodel = (id) => {
    setSelectedId(id);
    setShareMessage(""); // reset kare
    setShareModalOpen(true);
  };

  const closesharemodel = () => {
    setShareModalOpen(false);
  };

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const res = await axiosinstance.get("/api/room/getcompdata");

        if (res.status === 200) {
          setCompData(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompetitionData();
  }, []);

  const compdatadelete = async (cardId) => {
    try {
      const response = await toast.promise(
        axiosinstance.delete(`/api/room/deletecompdata/${cardId}`),
        {
          loading: "Deleting Data...",
          success: "Data Deleted Successfully",
        }
      );

      if (response.status === 200) {
        setCompData((prevData) =>
          prevData.filter((data) => data._id !== cardId)
        );
        setDeleteModalOpen(false);
        setSelectedId(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sharePost = async () => {
    if (!shareMessage.trim()) {
      toast.error("Please write a message before sharing!");
      return;
    }
    try {
      const res = await toast.promise(
        axiosinstance.post(`/api/room/competionpost/${selectedId}`, {
          message: shareMessage,
        }),
        {
          loading: "Posting...",
          success: "Post uploaded successfully",
        }
      );
      if (res.status === 200) {
        setSharedPosts((prev) => ({ ...prev, [selectedId]: true }));
        setShareModalOpen(false);
        setShareMessage("");
      }
    } catch (error) {
      toast.error(error.response.data.err[0].msg);
    }
  };

  const compPosthide = async (compId) => {
    const response = await toast.promise(
      axiosinstance.delete(`/api/room/compPostdelete/${compId}`),
      {
        loading: "Hiding post...",
        success: "Post hidden successfully",
        error: "Try again",
      }
    );
  };

  return (
    <div className="p-4 space-y-8">
      {compdata.length === 0 ? (
        <div className="flex justify-center items-center h-full min-h-[450px]">
          <div className="flex flex-col items-center">
            <p className="text-center capitalize font-semibold text-2xl text-gray-400">
              Nothing to see here
              <span>
                <HorizontalRuleTwoToneIcon />
              </span>
              yet
            </p>
          </div>
        </div>
      ) : (
        compdata.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl bg-[#2D2D2D] p-6 space-y-4 shadow-md"
          >
            <div className="flex justify-between items-center">
              <h2 className="capitalize text-xl  text-white">
                <i className="ri-message-3-line"></i> {item.topicName}{" "}
                <span>
                  <HorizontalRuleTwoToneIcon /> {item.levels} mode{" "}
                </span>
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => opendeletemodel(item._id)}
                  className="px-3 py-2 hover:bg-red-500 cursor-pointer transition-all text-white bg-[#474545] rounded-full"
                >
                  <i className="ri-delete-bin-6-line"></i>
                </button>

                <button className="px-3 py-2 hover:bg-white hover:text-black cursor-pointer transition-all text-white bg-[#474545] rounded-full">
                  {sharedPosts[item._id] ? (
                    <i
                      title="hide a post"
                      onClick={() => compPosthide(item._id)}
                      className="ri-eye-off-line"
                    ></i>
                  ) : (
                    <i
                      title="shared a post"
                      onClick={() => opensharemodel(item._id)}
                      className="ri-share-line"
                    ></i>
                  )}
                </button>
              </div>
            </div>

            {/* Quiz Data + Progress */}
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center  lg:items-center">
              <div className="compquiz overflow-y-auto max-h-[400px] w-full lg:w-[65%] space-y-4 pr-2">
                {item.quizdatacards.map((q, index) => {
                  const userWrongAnswers = item.WrongAnswer || [];
                  const userCorrectAnswers = item.correctedAnswer || [];
                  const correctAnswer = q.answer;

                  return (
                    <div
                      key={q._id}
                      className="bg-[#3b3b3b] p-4 rounded-2xl shadow space-y-2"
                    >
                      <p className=" text-white">
                        Q{index + 1}: {q.question}
                      </p>
                      <ul className="list-disc pl-5 text-white">
                        {q.options.map((opt, idx) => {
                          const isCorrect = userCorrectAnswers.includes(opt);
                          const isWrong = userWrongAnswers.includes(opt);

                          return (
                            <li
                              key={idx}
                              className={`${
                                isCorrect
                                  ? "text-green-500 "
                                  : isWrong
                                    ? "text-red-500"
                                    : ""
                              }`}
                            >
                              {opt}
                            </li>
                          );
                        })}
                      </ul>
                      {q.options.some((opt) =>
                        userWrongAnswers.includes(opt)
                      ) && (
                        <div className="text-sm">
                          <p className="text-red-400">
                            Your Answer:{" "}
                            <strong>
                              {userWrongAnswers.find((ans) =>
                                q.options.includes(ans)
                              )}
                            </strong>
                          </p>
                          <p className="text-green-400">
                            Correct Answer: <strong>{correctAnswer}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="w-40 flex-shrink-0">
                <CircularProgressbar
                  value={(item.score / item.total) * 100}
                  text={`${item.score}/${item.total}`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#3468f5",
                    trailColor: "#e0e0e0",
                  })}
                />

                <h1 className="text-center text-white mt-2 text-md ">
                  <i className="ri-trophy-line"></i> Your Score :{" "}
                  {Math.round((item.score / item.total) * 100)}%
                </h1>

                {/* Custom message */}
                <p className="text-center text-sm text-gray-300 mt-1">
                  {(() => {
                    const percentage = (item.score / item.total) * 100;
                    if (percentage >= 90) return "🎉 Excellent Performance!";
                    if (percentage >= 70) return "👍 Good Job!";
                    if (percentage >= 50) return "🙂 Keep Practicing!";
                    return "⚠️ Needs Improvement.";
                  })()}
                </p>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Delete Modal */}
      <Modal
        open={deleteModalOpen}
        onCancel={closedeletemodel}
        footer={null}
        closable={false}
        className="p-0 custom-modal-style"
        centered
      >
        <div className="text-white">
          <h1 className="text-[19px] tracking-tight">
            <i className="ri-error-warning-line text-yellow-300"></i> Remove
            Card Permission
          </h1>
          <p className="text-gray-300 mt-2 tracking-tight text-[15px]">
            Are you sure you want to delete your progress card? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={closedeletemodel}
              className="bg-[#4b4b4b] text-white px-10 py-2 rounded-full cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => compdatadelete(selectedId)}
              className="bg-white text-black px-10 py-2 rounded-full cursor-pointer"
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal
        open={shareModalOpen}
        onCancel={closesharemodel}
        footer={null}
        closable={false}
        className="p-0 custom-modal-style"
        centered
      >
        <div className="text-white">
          <h1 className="text-[19px] tracking-tight">
            <i className="ri-share-line text-blue-500"></i> Share Competation
            Card
          </h1>
          <p className="text-gray-300 mt-2 mb-2 capitalize tracking-tight text-[15px]">
            Write a caption for your shared competation card
          </p>
          <Input.TextArea
            rows={4}
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            placeholder="Write your message..."
            className="text-start mt-3 message"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={closesharemodel}
              className="bg-[#4b4b4b] text-white px-10 py-2 rounded-full cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={sharePost}
              className="bg-white text-black px-10 py-2 rounded-full cursor-pointer"
            >
              Share
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserCompetionData;
