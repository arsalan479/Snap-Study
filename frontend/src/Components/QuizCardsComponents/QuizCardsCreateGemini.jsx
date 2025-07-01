import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/QuizCardsContext";
import { axiosinstance } from "../../AxiosInstance/axios";
import toast from "react-hot-toast";

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

        setCards(response.data.data);

        //for Context
        setcards(response.data.data);

        setisSavedCard(false)
      } catch (error) {
        toast.error(
          error?.response?.data?.response || "Failed to generate quiz cards."
        );
      } finally {
        setisProcessing(false);
      }
    };

    if (ExtractText) {
      quizcardcreate();
    }
  }, [ExtractText]);

  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Generated Quiz Cards</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500">No cards generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow bg-white"
              >
                <h3 className="font-semibold text-lg mb-2">
                  Q{index + 1}:{card.question || `Question ${index + 1}`}
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {card.options?.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
                <p className="mt-2 text-green-600 text-sm">
                  <strong>Answer:</strong> {card.answer}
                </p>
              </div>
            ))}
            <div className="flex justify-center p-5">
              <button
                disabled={isSavedCard}
                onClick={async () => {
                  if (SaveQuizCard) {
                    await SaveQuizCard();
                    setisSavedCard(true);
                  } else {
                    console.log("function not avaliable");
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
