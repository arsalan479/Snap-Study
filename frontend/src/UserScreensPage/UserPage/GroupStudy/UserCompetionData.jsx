import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast from "react-hot-toast";
import HorizontalRuleTwoToneIcon from "@mui/icons-material/HorizontalRuleTwoTone";
import { Modal } from "antd";
import { useContext } from "react";

const UserCompetionData = () => {
  const [compdata, setCompData] = useState([]);
  const [modelopen, setmodelopen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const opendeletemodel = (id) => {
    setSelectedId(id);
    setmodelopen(true);
  };

  const closedeletemodel = () => {
    setmodelopen(false);
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
        setmodelopen(false);
        setSelectedId(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getpostdata = async (dataId) => {
    const res = await toast.promise(
      axiosinstance.post(`/api/room/competionpost/${dataId}`),
      {
        loading:"post uploading...",
        success:"post uploaded Successfully",
        error:"Try again later"
      }
    );
  };

  return (
    <div className="p-4 space-y-8">
      {compdata.length === 0 ? (
        <div className="flex justify-center items-center h-full min-h-[450px]">
          <div className="flex flex-col items-center">
            <p className="text-center font-semibold text-2xl text-white">
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
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="capitalize text-xl font-semibold text-white">
                <i className="ri-message-3-line"></i> {item.topicName}{" "}
                <span>
                  <HorizontalRuleTwoToneIcon /> {item.levels} mode{" "}
                </span>
              </h2>
              <button
                onClick={() => opendeletemodel(item._id)}
                className="px-3 py-2 hover:bg-red-500 cursor-pointer transition-all text-white bg-[#474545] rounded-full"
              >
                <i className="ri-delete-bin-6-line"></i>
              </button>

              <button
                onClick={() => getpostdata(item._id)}
                className="bg-white text-black p-2 rounded-full capitalize cursor-pointer"
              >
                share{" "}
                <span>
                  <i class="ri-share-forward-line"></i>
                </span>
              </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center  lg:items-center">
              {/* Scrollable Questions */}
              <div className="compquiz overflow-y-auto max-h-[400px] w-full lg:w-[65%] space-y-4 pr-2">
                {item.quizdatacards.map((q, index) => {
                  const userAnswer = item.WrongAnswer?.[index];
                  const correctAnswer = q.answer;
                  const wasWrong =
                    userAnswer !== undefined && userAnswer !== correctAnswer;

                  return (
                    <div
                      key={q._id}
                      className="bg-[#3b3b3b] p-4 rounded-2xl shadow space-y-2"
                    >
                      <p className="font-medium text-white">
                        Q{index + 1}: {q.question}
                      </p>

                      <ul className="list-disc pl-5 text-white">
                        {q.options.map((opt, idx) => (
                          <li
                            key={idx}
                            className={`${
                              opt === correctAnswer
                                ? "text-green-500 font-semibold"
                                : wasWrong && opt === userAnswer
                                  ? "text-red-500"
                                  : ""
                            }`}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>

                      {wasWrong && (
                        <div className="text-sm">
                          <p className="text-red-400">
                            Your Answer: <strong>{userAnswer}</strong>
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

              {/* Progress */}
              <div className="w-40 flex-shrink-0">
                <CircularProgressbar
                  value={(item.score / item.total) * 100}
                  text={`${item.score}/${item.total}`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#5227FF",
                    trailColor: "#e0e0e0",
                  })}
                />
                <h1 className="text-center text-white mt-2 text-md font-medium">
                  <i className="ri-trophy-line"></i> Your Score :
                  {Math.round((item.score / item.total) * 100)}%
                </h1>
                <div className="flex justify-center mt-1">
                  <p className="text-sm font-semibold text-yellow-400 text-center">
                    {(() => {
                      const percentage = (item.score / item.total) * 100;

                      if (percentage >= 90) return "🌟 Outstanding!";
                      if (percentage >= 80) return "🎯 Excellent!";
                      if (percentage >= 60) return "👍 Good Job!";
                      if (percentage >= 40) return "📝 Keep Practicing!";
                      return "🚧 Needs Improvement";
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <Modal
        open={modelopen}
        onCancel={closedeletemodel}
        footer={null}
        closable={false}
        className="p-0 custom-modal-style"
        centered
      >
        <div className="text-white">
          <h1 className="text-[19px] tracking-tight">
            <span>
              <i className="ri-error-warning-line text-yellow-300"></i>
            </span>{" "}
            Remove Card Permission
          </h1>
          <p className="text-gray-300 mt-2 tracking-tight text-[15px]">
            Are you sure you want to delete your progress card? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={closedeletemodel}
              className="bg-[#4b4b4b] text-white  px-10 py-2 rounded-full cursor-pointer"
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
    </div>
  );
};

export default UserCompetionData;
