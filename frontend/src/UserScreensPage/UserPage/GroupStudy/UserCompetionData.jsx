import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast from "react-hot-toast";
import HorizontalRuleTwoToneIcon from '@mui/icons-material/HorizontalRuleTwoTone';




const UserCompetionData = () => {
  const [compdata, setCompData] = useState([]);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {compdata.length === 0 ? (
        <div className="flex justify-center items-center h-full min-h-[450px]">
          <div className="flex flex-col items-center">
            <p className="text-center font-semibold text-2xl text-whtie -400">
              Nothing to see here <span><HorizontalRuleTwoToneIcon/></span> yet
            </p>
          </div>
        </div>
      ) :(

        compdata.map((item) => (
          
          <div key={item._id} className=" p-20 rounded-2xl bg-red-400 h-auto">
          
            <button
              onClick={() => compdatadelete(item._id)}
              className="px-3 py-2 hover:bg-red-400 duration-300  mb-4  cursor-pointer text-white capitalize bg-[#474545] rounded-full"
            >
              <span>
                <i className="ri-delete-bin-6-line  "></i>
              </span>
            </button>

            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Topic: {item.topicName}
            </h2>

            <p className="text-sm text-whtie mb-2">Level: {item.levels}</p>

<div className="flex justify-center items-center gap-30">

            <div className="mt-4">

              {item.quizdatacards.map((q, index) => {
                const userAnswer = item.WrongAnswer?.[index];
                const correctAnswer = q.answer;
                const wasWrong =
                  userAnswer !== undefined && userAnswer !== correctAnswer;

                return (
                  <div
                    key={q._id}
                    className="mt-4 p-3 border rounded shadow-sm"
                  >
                    <p className="font-medium text-whtie">
                      Q{index + 1}: {q.question}
                    </p>

                    <ul className="list-disc pl-5 mt-1 text-whtie">
                      {q.options.map((opt, idx) => (
                        <li
                          key={idx}
                          className={`${
                            opt === correctAnswer
                              ? "text-green-600 font-semibold"
                              : wasWrong && opt === userAnswer
                                ? "text-red-600"
                                : ""
                          }`}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>

                    {wasWrong && (
                      <div className="mt-2 text-sm">
                        <p className="text-red-500">
                          Your Answer: <strong>{userAnswer}</strong>
                        </p>
                        <p className="text-green-600">
                          Correct Answer: <strong>{correctAnswer}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
           <div>
            
            <div className="mt-4 w-40 h-40 mx-auto">
              <CircularProgressbar
                value={(item.score / item.total) * 100}
                text={`${item.score}/${item.total}`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#5227FF",
                  trailColor: "#e0e0e0",
                })}
              />
           <h1 className="text-center text-whtie mt-2 text-md font-medium">
              Percentage: {(item.score / item.total) * 100}%
            </h1>
            </div>

            

            </div>


</div>


          </div>
        ))
      )}


    </div>
  );
};

export default UserCompetionData;
