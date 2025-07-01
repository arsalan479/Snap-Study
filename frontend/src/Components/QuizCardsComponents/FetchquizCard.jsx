import React, { useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useQuizCard } from "../../Context/QuizCardCrudContext.jsx";
import PopupSureDelete from "../../Utils/PopupSureDelete";
import toast from "react-hot-toast";
import { axiosinstance } from "../../AxiosInstance/axios.js";
import PopupSureUpdate from "../../Utils/PopupSureUpdate.jsx";

const FetchquizCard = ({ quizcards: propQuizCards }) => {
  const context = useQuizCard();
  const quizcards = propQuizCards || context.quizcards;

  const {
    showAllDeleteConfirm,
    DeleteCardobjeConfirm,
    showSpecificDeleteConfirm,
  } = PopupSureDelete();

  const [localQuizCards, setLocalQuizCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    if (Array.isArray(quizcards)) {
      setLocalQuizCards(quizcards);
    }
  }, [quizcards]);

  const handleOpenUpdateModal = (id, currentTitle) => {
    setSelectedId(id);
    setSelectedTitle(currentTitle);
    setIsModalOpen(true);
  };

  const handleUpdateTitle = async (newTitle) => {
    try {
      const response = await toast.promise(
        axiosinstance.patch(`/api/quiz/crud/quizTitleUpadate/${selectedId}`, {
          title: newTitle,
        }),
        {
          loading: "Updating Title...",
          success: "Title Updated Successfully!",
        }
      );

      if (response.status === 200) {
        const updated = localQuizCards.map((group) => ({
          ...group,
          sets: group.sets.map((cardSet) =>
            cardSet.id === selectedId
              ? { ...cardSet, title: newTitle }
              : cardSet
          ),
        }));
        setLocalQuizCards(updated);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  if (!Array.isArray(localQuizCards)) {
    return <p className="text-red-500">Failed to load quiz cards.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Save History Of Quiz Cards</h2>

      {localQuizCards.length === 0 ? (
        <p className="text-gray-500">No cards yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {localQuizCards.map((QuizSetGroup, groupIdx) =>
            QuizSetGroup.sets.map((QuizSet, setIdx) => (
              <React.Fragment key={QuizSet.id || `${groupIdx}-${setIdx}`}>
                <div className="w-130 mb-10">
                  <img
                    src={QuizSet.imageURl}
                    className="w-full object-cover"
                    alt="Quiz Cover"
                  />
                </div>
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      showAllDeleteConfirm(QuizSet.subject);
                    }}
                    className="px-7 py-3 flex justify-center items-center gap-2 cursor-pointer rounded-2xl text-white bg-red-500"
                  >
                    All Delete
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>

                <h1 className="text-center col-span-full font-bold text-3xl mb-4">
                  Title: {QuizSet.title}
                  <button
                    onClick={() =>
                      handleOpenUpdateModal(QuizSet.id, QuizSet.title)
                    }
                    className="bg-green-500 p-2 ml-2 rounded-full cursor-pointer text-white"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <br />
                  <span className="text-xl font-medium">
                    Subject: {QuizSet.subject}
                  </span>
                </h1>

                {QuizSet.cards?.map((card, index) => (
                  <div
                    key={`${QuizSet.id}-${card.id || index}`}
                    className="border rounded-lg p-4 shadow bg-white"
                  >
                    <button
                      onClick={() => showSpecificDeleteConfirm(card.id)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      title="Delete Card"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                    <h3 className="font-semibold text-lg mb-2">
                      Q{index + 1}: {card.question || `Question ${index + 1}`}
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

                <button
                  onClick={() => DeleteCardobjeConfirm(QuizSet.id)}
                  className="px-4 cursor-pointer text-white capitalize py-3 bg-red-400 rounded-2xl mt-4"
                >
                  Delete This Document
                </button>
              </React.Fragment>
            ))
          )}
        </div>
      )}

      <PopupSureUpdate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleUpdateTitle}
        initialTitle={selectedTitle}
      />
    </div>
  );
};

export default FetchquizCard;
