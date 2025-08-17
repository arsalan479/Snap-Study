import { React, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";
import toast from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MainGroup = () => {
  const [topic, settopic] = useState("");
  const [numberquestion, setnumberquestion] = useState("");
  const [levels, setlevels] = useState("");
  const [datashow, setdatashow] = useState([]);
  const [useranswer, setuseranswer] = useState({});
  const [scoreData, setscoreData] = useState(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [datasavebtn, setdatasavebtn] = useState(false);

  const generatecompetationquiz = async () => {
    try {
      const response = await toast.promise(
        axiosinstance.post("/api/room/sendcomp", {
          topicName: topic,
          numberofquestions: numberquestion,
          levels: levels,
        }),
        {
          loading: "Generating Quiz's...",
          success: "generated Quiz's Solve it",
        }
      );

      if (response.status === 200) {
        setdatashow(response.data.response);
        setscoreData(null);
        setisSubmitting(false);
        setdatasavebtn(false)
        setuseranswer({});
      }
    } catch (error) {
      const data = error?.response?.data;

      if (data?.message?.includes("credits")) {
        toast.error(data?.message);
      } else if (data?.error?.length) {
        toast.error(data?.error[0].msg);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    }
  };

  const submitquizdata = async () => {
    const payload = datashow.map((item, index) => ({
      question: item.question,
      selectedAnswer: useranswer[index] || null,
      correctAnswer: item.correctAnswer,
    }));

    try {
      const response = await toast.promise(
        axiosinstance.post("/api/room/sumbitquizdata", {
          quiz: payload,
        }),
        {
          loading: "Sumit your quiz...",
          success: "your quiz is submitted",
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setscoreData(response.data);
        setisSubmitting(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const quizcompdatasave = async () => {
    if (!scoreData) {
      toast.error("No score data available to save.");
      return;
    }

    const correctedAnswer = scoreData.result
      .filter((item) => item.isCorrect)
      .map((item) => item.correctAnswer);

    const WrongAnswer = scoreData.result
      .filter((item) => !item.isCorrect)
      .map((item) => item.selectedAnswer);

    const quizdatacards = datashow.map((item) => ({
      question: item.question,
      answer: item.correctAnswer,
      options: Object.values(item.options), // keep all options
    }));

    try {
      const response = await toast.promise(
        axiosinstance.post("/api/room/aicompdatasave", {
          topicName: topic,
          numberofquestion: numberquestion,
          levels: levels,
          score: scoreData.score,
          total: scoreData.total,
          correctedAnswer,
          WrongAnswer,
          quizdatacards,
        }),
        {
          loading: "data saving...",
          success: "data saved successfully",
        }
      );

      if (response.status === 201) {
        console.log(response);
        setdatasavebtn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4  mt-8">
      <h1 className="text-2xl font-bold mb-4">Generate Competition</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => settopic(e.target.value)}
        placeholder="Enter topic name"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
      />

      <select
        value={numberquestion}
        onChange={(e) => setnumberquestion(e.target.value)}
        className="border bg-[var(--bg2)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <option selected disabled value="">
          Select number of questions
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <select
        value={levels}
        onChange={(e) => setlevels(e.target.value)}
        className="border bg-[var(--bg2)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <option value="">Select Level</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button
        className="cursor-pointer bg-white text-black px-4 py-3 rounded-2xl duration-300 transition-colors"
        onClick={generatecompetationquiz}
      >
        Generate
      </button>

      {datashow.map((item, index) => (
        <div key={index} className="border p-4 rounded-2xl mb-2">
          <h2 className="font-semibold">
            Question {index + 1}: {item.question}
          </h2>

          <div className="ml-4 mt-2 space-y-1">
            {Object.entries(item.options).map(([key, value]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={useranswer[index] === value}
                  value={value}
                  onChange={() =>
                    setuseranswer((prev) => ({ ...prev, [index]: value }))
                  }
                  className="accent-blue-600"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {datashow.length > 0 && (
        <div>
          <button
            disabled={isSubmitting}
            onClick={submitquizdata}
            className={`px-5 py-3 rounded-2xl transition-colors
    ${
      isSubmitting
        ? "bg-gray-500 text-white cursor-not-allowed"
        : "bg-white  cursor-pointer text-black"
    }
  `}
          >
            {isSubmitting ? (<>Already Submitted <span><i className="text-lg ri-checkbox-circle-line"></i></span> </>) : (<>Submit Quiz <span><i className="text-lg ri-send-plane-line"></i></span> </>)}
          </button>

       <button
            disabled={datasavebtn}
            onClick={quizcompdatasave}
            className={`${datasavebtn ? "bg-gray-500 cursor-not-allowed text-white" : "bg-[#fff] cursor-pointer text-black"} px-5 ml-5 py-3 rounded-2xl cursor-pointer mb-5 mt-6`}
          >
            {datasavebtn ? (<span className="cursor-not-allowed">Already Save Competion Data <i className="ml-1 ri-checkbox-circle-line"></i></span>) : (<>Save Competion Data <span><i className="ml-1 ri-save-line"></i></span></>)}
          </button>
        </div>
      )}

      <div className=" p-6 rounded-2xl">
        {scoreData && (
          <>
            {/* 📊 Progress Bar on Top */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-40 h-40">
                <CircularProgressbar
                  value={(scoreData.score / scoreData.total) * 100}
                  text={`${scoreData.score}/${scoreData.total}`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#3468f5",
                    trailColor: "#e0e0e0",
                  })}
                />
              </div>
              <h1 className="text-center text-white mt-2 text-md font-medium">
                <i className="ri-trophy-line"></i> Your Score :
                {Math.round((scoreData.score / scoreData.total) * 100)}%
              </h1>
              <p className="text-center text-white font-semibold mt-4">
                {(() => {
                  const percentage = (scoreData.score / scoreData.total) * 100;
                  if (percentage >= 90) return "🌟 Outstanding!";
                  if (percentage >= 80) return "🎯 Excellent!";
                  if (percentage >= 60) return "👍 Good Job!";
                  if (percentage >= 40) return "📝 Keep Practicing!";
                  return "🚧 Needs Improvement";
                })()}
              </p>
            </div>

            {/* 🟫 Main Brown Section with Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] overflow-hidden">
              {/* ❌ Incorrect Answers */}
              <div className=" bg-[#2D2D2D] p-4 rounded-2xl">
                <h2 className="text-center text-red-300 font-semibold text-lg mb-4">
                  ❌ Incorrect Answers
                </h2>
                {scoreData.result.filter((item) => !item.isCorrect).length ===
                0 ? (
                  <p className="text-center text-gray-300">
                    All answers correct ✅
                  </p>
                ) : (
                  <div className="compquiz space-y-4 overflow-auto h-100 bg-[#3b3b3b] p-4 rounded-2xl">
                    {scoreData.result
                      .filter((item) => !item.isCorrect)
                      .map((item, idx) => (
                        <div key={idx} className=" p-3 rounded-md text-white">
                          <p className="font-medium mb-1">
                            Q{idx + 1} {item.question}
                          </p>
                          <p>
                            Your Answer:{" "}
                            <span className="text-red-400 ">
                              {item.selectedAnswer || "No Answer"}
                            </span>
                          </p>
                          <p>
                            Correct Answer:{" "}
                            <span className="text-green-400 ">
                              {item.correctAnswer}
                            </span>
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* ✅ Correct Answers */}
              <div className=" bg-[#2D2D2D] p-4 rounded-2xl">
                <h2 className="text-center text-green-400 font-semibold text-lg mb-4">
                  ✅ Correct Answers
                </h2>
                {scoreData.result.filter((item) => item.isCorrect).length ===
                0 ? (
                  <p className="text-center text-gray-300">
                    No correct answers
                  </p>
                ) : (
                  <div className="compquiz space-y-4 overflow-auto h-100 bg-[#3b3b3b] p-4 rounded-2xl">
                    {scoreData.result
                      .filter((item) => item.isCorrect)
                      .map((item, idx) => (
                        <div key={idx} className=" p-3 rounded-md   text-white">
                          <p className="font-medium mb-1">
                            Q{idx + 1} {item.question}
                          </p>
                          <p>
                            Correct Answer:{" "}
                            <span className="text-green-400 ">
                              {item.correctAnswer}
                            </span>
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
           
      </div>
      
    </div>
  );
};

export default MainGroup;
