import { React,useState,createContext } from "react";

export const AppContext = createContext();

const QuizCardsContext = ({children}) => {
  const [FileUrl, setFileUrl] = useState(null);
  const [ExtractText, setExtractText] = useState(null)
  const [Cards, setcards] = useState([]);
  const [SaveQuizCard, setSaveQuizCard] = useState(null)
  const [isProcessing, setisProcessing] = useState(false)

  return( <AppContext.Provider 
  value={{
    FileUrl,
    setFileUrl,
    ExtractText,
    setExtractText,
    Cards,
    setcards,
    SaveQuizCard,
    setSaveQuizCard,
    isProcessing,
    setisProcessing
  }}
  >

    {children}
  </AppContext.Provider>
  )
};

export default QuizCardsContext;
