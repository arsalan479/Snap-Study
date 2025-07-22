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
        console.log(response.data.response);
        setdatashow(response.data.response);
        setscoreData(null);
        setisSubmitting(false);
        setuseranswer({});
      }
    } catch (error) {
      toast.error(error.response.data.error[0].msg);
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
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Generate Competition</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => settopic(e.target.value)}
        placeholder="Enter topic name"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={numberquestion}
        onChange={(e) => setnumberquestion(e.target.value)}
        className="border bg-[var(--bg2)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option selected disabled value="">
          Select number of questions
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <select
        value={levels}
        onChange={(e) => setlevels(e.target.value)}
        className="border bg-[var(--bg2)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Level</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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
            className={`px-8 py-3 rounded-2xl transition-colors
    ${
      isSubmitting
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-red-400  cursor-pointer text-white"
    }
  `}
          >
            {isSubmitting ? "Already Submitted" : "Submit Quiz"}
          </button>

          <button
            disabled={datasavebtn}
            onClick={quizcompdatasave}
            className={`${datasavebtn ? "bg-gray-800 cursor-not-allowed text-white" : "bg-red-500 cursor-pointer text-white"} py-3 rounded-2xl cursor-pointer`}
          >
            {datasavebtn ? "Already submitting":"sumbit data"}
          </button>
          
        </div>
      )}

      <div className="py-20">
        {scoreData && (
          <>
            <div className="mt-6 w-60 h-60 mx-auto">
              <CircularProgressbar
                value={(scoreData.score / scoreData.total) * 100}
                text={`${scoreData.score}/${scoreData.total}`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#5227FF",
                  trailColor: "gray",
                })}
              />
            </div>

            <h2 className="text-xl font-semibold text-center mt-6 text-red-600">
              Incorrect Answers
            </h2>

            <div className="mt-4 space-y-4">
              {scoreData.result
                .filter((item) => !item.isCorrect)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-black border-l-4 border-red-500 p-4 rounded"
                  >
                    <p className="font-medium">Question: {item.question}</p>
                    <p>
                      Your Answer
                      <span className="text-red-600">
                        {item.selectedAnswer || "No Answer"}
                      </span>
                    </p>
                    <p>
                      Correct Answer:{" "}
                      <span className="text-green-600">
                        {item.correctAnswer}
                      </span>
                    </p>
                  </div>
                ))}
            </div>

            <h2 className="text-xl font-semibold text-center mt-6 text-green-600">
              Corrected Answers
            </h2>

            <div className="mt-4 space-y-4">
              {scoreData.result
                .filter((item) => item.isCorrect)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-black border-l-4 border-red-500 p-4 rounded"
                  >
                    <p className="font-medium">Question: {item.question}</p>
                    <p>
                      Correct Answer
                      <span className="text-green-600">
                        {item.correctAnswer}
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainGroup;
