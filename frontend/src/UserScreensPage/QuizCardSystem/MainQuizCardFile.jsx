import React from 'react'
import QuizFileUpload from '../../Components/QuizCardsComponents/QuizFileUpload'
import ExtractTextQuiz from '../../Components/QuizCardsComponents/ExtractTextQuiz'
import QuizCardsCreateGemini from '../../Components/QuizCardsComponents/QuizCardsCreateGemini'
import QuizCardSave from '../../Components/QuizCardsComponents/QuizCardSave'

const MainQuizCardFile = () => {
  return (
 
    <>
    <QuizCardSave/>
    <QuizFileUpload/>
    <ExtractTextQuiz/>
    <QuizCardsCreateGemini/>
    </>


  )
}

export default MainQuizCardFile