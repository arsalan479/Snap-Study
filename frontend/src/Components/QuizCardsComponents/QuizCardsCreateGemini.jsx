import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/QuizCardsContext";
import { axiosinstance } from "../../AxiosInstance/axios";
import toast from "react-hot-toast";
import QuizCardsCarousel from "../../../ReactBits/Carousel/Carousel";

const QuizCardsCreateGemini = () => {
  const { ExtractText, setcards, setisProcessing, SaveQuizCard } = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [isSavedCard, setisSavedCard] = useState(false);

  useEffect(() => {

    const quizcardcreate = async () => {
      if (!ExtractText) return;
      setisProcessing(true);


      try {
        const response = await toast.promise(
          axiosinstance.post("api/quiz/quizgeminiapi", { text: ExtractText }),
          {
            loading: "Quiz Cards Generating...",
            success: "Quiz Cards Generated Successfully",
          }
        );

        if(response.status === 200){
          console.log(response.data)

          setCards(response.data.data);
          //for context
          setcards(response.data.data);
        
          setisSavedCard(false)
        
        }
        
        

      } catch (error) {
        toast.error(
          error?.response?.data?.response || "Failed to generate quiz cards."
        );
      } finally {
        setisProcessing(false);
      }
    };

      quizcardcreate();
   
  }, [ExtractText]);

  return (
     <div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Generated Quiz Cards</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500">No cards generated yet.</p>
        ) : (
          <div className="flex flex-col items-center">
            <QuizCardsCarousel 
              cards={cards} 
              baseWidth={400} 
              round={false} 
            />
            <div className="flex justify-center p-5">
              <button
                disabled={isSavedCard}
                onClick={async () => {
                  if (SaveQuizCard) {
                    await SaveQuizCard();
                    setisSavedCard(true);
                  } else {
                    toast.error("function not available");
                  }
                }}
                className={`px-7 cursor-pointer py-3 rounded-2xl text-white ${
                  isSavedCard ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                }`}
              >
                {isSavedCard ? 'Cards Saved!' : 'Save Cards?'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCardsCreateGemini;
