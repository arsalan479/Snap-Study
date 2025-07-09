import React, { useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useQuizCard } from "../../Context/QuizCardCrudContext.jsx";
import PopupSureDelete from "../../Utils/PopupSureDelete";
import toast from "react-hot-toast";
import { axiosinstance } from "../../AxiosInstance/axios.js";
import PopupSureUpdate from "../../Utils/PopupSureUpdate.jsx";

// import your Carousel
import QuizCardsCarousel from "../../../ReactBits/Carousel/Carousel.jsx";

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
        <div className="flex flex-col gap-10">
          {localQuizCards.map((QuizSetGroup, groupIdx) =>
            QuizSetGroup.sets.map((QuizSet, setIdx) => (
              <React.Fragment key={QuizSet.id || `${groupIdx}-${setIdx}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <img
                        src={QuizSet.imageURl}
                        className="w-20 h-20 object-cover rounded"
                        alt="Quiz Cover"
                      />
                      <div>
                        <h1 className="font-bold text-2xl">
                          Title: {QuizSet.title}
                          <button
                            onClick={() =>
                              handleOpenUpdateModal(QuizSet.id, QuizSet.title)
                            }
                            className="bg-green-500 p-2 ml-2 rounded-full cursor-pointer text-white"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </button>
                        </h1>
                        <p className="text-lg">
                          Subject: <strong>{QuizSet.subject}</strong>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          showAllDeleteConfirm(QuizSet.subject);
                        }}
                        className="px-4 py-2 flex justify-center items-center gap-1 cursor-pointer rounded text-white bg-red-500"
                      >
                        All Delete
                        <TrashIcon className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => DeleteCardobjeConfirm(QuizSet.id)}
                        className="px-4 py-2 cursor-pointer text-white capitalize bg-red-400 rounded"
                      >
                        Delete Document
                      </button>
                    </div>
                  </div>

                  {/* 🧾 Carousel here */}
                  <QuizCardsCarousel
                    cards={QuizSet.cards}
                    baseWidth={350}
                    round={false}
                    onDeleteCard={showSpecificDeleteConfirm} // 👈 pass here
                  />
                </div>
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
