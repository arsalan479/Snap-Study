import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/QuizCardsContext";
import { axiosinstance } from "../../AxiosInstance/axios";
import toast from "react-hot-toast";
import QuizCardsCarousel from "../../../ReactBits/Carousel/Carousel";

const QuizCardsCreateGemini = () => {
  const { ExtractText, setcards, setisProcessing, SaveQuizCard } =
    useContext(AppContext);
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

        if (response.status === 200) {
          console.log(response.data);

          setCards(response.data.data);
          //for context
          setcards(response.data.data);

          setisSavedCard(false);
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
        <h2 className="text-3xl mt-10  mb-1 text-center">Generated Quiz Cards</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500 text-center">No cards generated yet.</p>
        ) : (
          <div className="flex flex-col items-center">
            <QuizCardsCarousel cards={cards} baseWidth={400} round={false} />
            <div className="flex justify-center p-5">
              <button
                disabled={
                  isSavedCard ||
                  !localStorage.getItem("subject") ||
                  !cards.length
                }
                onClick={async () => {
                  if (!localStorage.getItem("subject")) {
                    toast.error("Subject is required!");
                    return;
                  }
                  if (SaveQuizCard) {
                    const success = await SaveQuizCard();
                    if (success) {
                      setisSavedCard(true);
                    }
                  } else {
                    toast.error("function not available");
                  }
                }}
                className={`px-7  py-3 rounded-2xl text-black transition-all duration-300 
    ${isSavedCard ? "bg-gray-600 " : "bg-white "}`}
              >
{isSavedCard ? (
    <>
      
      <span className="cursor-not-allowed text-white">Cards Saved <i class="ri-checkbox-circle-line"></i></span>
    </>
  ) : (
    <>
      <span className="cursor-pointer"> Save Cards <i class="ri-save-line"></i></span>
    </>
  )}              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCardsCreateGemini;
