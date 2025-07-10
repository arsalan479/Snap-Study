import React, { useState } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";

const ExplainQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support text-to-speech.");
      return;
    }

    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = "en-US";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1.2;

    window.speechSynthesis.speak(msg);
  };

  const handleExplain = async () => {
    setLoading(true);
    setError("");
    setExplanation("");

    const question = "What is the capital of France?";
    const options = ["Berlin", "Madrid", "Paris", "Rome"];
    const answer = "Paris";

    try {
      const response = await axiosinstance.post("/api/quiz/explainquiz", {
        question,
        options,
        answer,
      });

      const { explanation } = response.data;

      if (explanation) {
        setExplanation(explanation);
        speak(explanation);
      } else {
        setError("No explanation found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Quiz Explanation</h2>

      <button
        onClick={handleExplain}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Loading..." : "Explain & Speak"}
      </button>

      {explanation && (
        <p className="mt-4 p-2 bg-green-100 rounded text-green-800">
          {explanation}
        </p>
      )}

      {error && (
        <p className="mt-4 p-2 bg-red-100 rounded text-red-800">{error}</p>
      )}
    </div>
  );
};

export default ExplainQuiz;
