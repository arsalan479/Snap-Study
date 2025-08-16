import React, { useContext, useEffect } from "react";
import QuizFileUpload from "../../Components/QuizCardsComponents/QuizFileUpload";
import ExtractTextQuiz from "../../Components/QuizCardsComponents/ExtractTextQuiz";
import QuizCardsCreateGemini from "../../Components/QuizCardsComponents/QuizCardsCreateGemini";
import QuizCardSave from "../../Components/QuizCardsComponents/QuizCardSave";
import { AppContext } from "../../Context/QuizCardsContext";

const MainQuizCardFile = () => {
  const { resetQuizState } = useContext(AppContext);

  useEffect(() => {
    resetQuizState();
    return () => resetQuizState();
  }, []); // ✅ sirf mount/unmount pe chalega

  return (
    <>
      <QuizCardSave />
      <QuizFileUpload />
      <ExtractTextQuiz />
      <QuizCardsCreateGemini />
    </>
  );
};

export default MainQuizCardFile;
