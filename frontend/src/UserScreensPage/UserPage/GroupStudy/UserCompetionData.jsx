import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../../AxiosInstance/axios";

const UserCompetionData = () => {
  const [compdata, setCompData] = useState([]);

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const res = await axiosinstance.get("/api/room/getcompdata");

        if (res.status === 200) {
            console.log(res.data.data)
          setCompData(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompetitionData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {compdata.map((item) => (
        <div key={item._id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-600">
            Topic: {item.topicName}
          </h2>
          <p>Level: {item.levels}</p>
          <p>
            Score: {item.score}/{item.total}
          </p>

          <div className="mt-2">
            <h3 className="font-bold">Questions:</h3>
            {item.quizdatacards.map((q) => (
              <div key={q._id} className="mt-2">
                <p className="font-medium">Q: {q.question}</p>
                <ul className="list-disc pl-5">
                  {q.options.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
                <p className="text-green-700">Correct: {q.answer}</p>
              <p className="text-red-600">
              Wrong Answers: {item.WrongAnswer.join(", ")}
            </p>
              </div>
            ))}
          </div>

          <div className="mt-2">
            
            <p className="text-green-600">
              Corrected Answers: {item.correctedAnswer.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCompetionData;
