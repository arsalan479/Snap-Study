import React, { useState, useRef } from "react";
import { axiosinstance } from "../../AxiosInstance/axios";
import LoopTwoToneIcon from "@mui/icons-material/LoopTwoTone";
import VolumeUpSharpIcon from '@mui/icons-material/VolumeUpSharp';
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";

const ExplainQuiz = ({ question, options, answer }) => {
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

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
    msg.pitch = 1.1;

    msg.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = msg;
    window.speechSynthesis.speak(msg);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    utteranceRef.current = null;
  };

  const handleClick = async () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    setLoading(true);

    try {
      const response = await axiosinstance.post("/api/quiz/explainquiz", {
        question,
        options,
        answer,
      });

      const { explanation } = response.data;

      if (explanation) {
        speak(explanation);
      } else {
        alert("No explanation found.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to get explanation.");
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = () => {
    if (loading) {
      return <LoopTwoToneIcon className="animate-spin " />;
    }
    if (isSpeaking) {
      return <StopCircleSharpIcon />;
    }
    return <VolumeUpSharpIcon />;
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer rounded text-white bg-transparent"
      disabled={loading && !isSpeaking}
    >
      {renderIcon()}
    </button>
  );
};

export default ExplainQuiz;
