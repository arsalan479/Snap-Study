// src/Components/UserDashboard/QuizCardHistory.jsx

import React, { useMemo } from "react";
import SubjectFilterQuiz from "../QuizCardsComponents/SubjectFilterQuiz";
import { useQuizCard } from "../../Context/QuizCardCrudContext";

const QuizCardHistory = ({ subject }) => {
  const { quizcards } = useQuizCard();

  const uniqueSubjects = useMemo(() => {
    const subjectsSet = new Set();
    quizcards?.forEach((group) => {
      if (group.subject) {
        subjectsSet.add(group.subject.toLowerCase());
      }
    });
    return Array.from(subjectsSet);
  }, [quizcards]);

  return {
    uniqueSubjects,
    content: subject ? (
      <SubjectFilterQuiz subject={subject} />
    ) : (
      <div className="text-white text-xl text-center mt-10">
        Please select a subject to view cards.
      </div>
    ),
  };
};

export default QuizCardHistory;
