import React from 'react';
import { useQuizCard } from "../../Context/QuizCardCrudContext.jsx";
import FetchquizCard from "../QuizCardsComponents/FetchquizCard.jsx";

const SubjectFilterQuiz = ({subject}) => {
  const { quizcards } = useQuizCard();
  
  // Filter cards by subject
  const filteredCards = quizcards.filter(card => 
    card.subject.toLowerCase() === subject.toLowerCase()
  ); 
    return (
    <div>
  <h2 className="text-2xl font-bold mb-4">
        {subject.charAt(0).toUpperCase() + subject.slice(1)} Cards
      </h2>
      <FetchquizCard quizcards={filteredCards} />

    </div>
  )
}

export default SubjectFilterQuiz