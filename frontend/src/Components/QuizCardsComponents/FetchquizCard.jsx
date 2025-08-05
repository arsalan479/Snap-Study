import React, { useEffect, useState } from "react";
import { useQuizCard } from "../../Context/QuizCardCrudContext.jsx";
import PopupSureDelete from "../../Utils/PopupSureDelete";
import toast from "react-hot-toast";
import { axiosinstance } from "../../AxiosInstance/axios.js";
import PopupSureUpdate from "../../Utils/PopupSureUpdate.jsx";
import QuizCardsCarousel from "../../../ReactBits/Carousel/Carousel.jsx";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import { QuizToPdf } from "../../Utils/QuizToPdf.jsx";

const FetchquizCard = ({ quizcards: propQuizCards, subject, title }) => {
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
  const [selectedImage, setSelectedImage] = useState(null);

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
      {localQuizCards.length === 0 ? (
        <p className="text-gray-500">No cards yet.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {localQuizCards.map((QuizSetGroup, groupIdx) =>
            QuizSetGroup.sets.map((QuizSet, setIdx) => (
              <React.Fragment key={QuizSet.id || `${groupIdx}-${setIdx}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className=" flex gap-4 items-center">
                      <img
                        src={QuizSet.imageURl}
                        className="w-20 cursor-zoom-in h-20 object-cover rounded"
                        alt="Quiz Cover"
                        onClick={() => setSelectedImage(QuizSet.imageURl)}
                      />
                      <div>
                        <h1 className=" text-2xl capitalize">
                          Title: {QuizSet.title}
                          <button
                            onClick={() =>
                              handleOpenUpdateModal(QuizSet.id, QuizSet.title)
                            }
                            className="ml-1 rounded-full cursor-pointer text-white"
                          >
                            <DriveFileRenameOutlineTwoToneIcon titleAccess="Edit Title" />
                          </button>
                        </h1>
                        <button
                        title="Export to PDF"
                        className="bg-[white] mt-2 px-4 py-2 rounded-full cursor-pointer text-black"
                        onClick={() => QuizToPdf(QuizSet.cards)}
                      >
                        
                        <span>
                         Export <i className="ri-download-line"></i>
                        </span>
                      </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {/* <button
                        type="button"
                        onClick={() => {
                          showAllDeleteConfirm(QuizSet.subject);
                        }}
                        className="px-4 py-2 tracking-tight flex justify-center items-center gap-1 cursor-pointer rounded text-white bg-red-500"
                      >
                        Remove All <TrashIcon className="w-4 h-4" />
                      </button> */}
                      
                      <button
                      title="Remove This Card"
                        onClick={() => DeleteCardobjeConfirm(QuizSet.id)}
                        className="px-3 py-2 cursor-pointer text-white capitalize bg-[#474545] hover:bg-red-500 duration-300 rounded-full"
                      >
                        <span>
                          <i class="ri-delete-bin-6-line"></i>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 🧾 Carousel here */}
                  <div className="flex justify-center mt-8">
                    <QuizCardsCarousel
                      cards={QuizSet.cards}
                      baseWidth={650}
                      round={false}
                      onDeleteCard={showSpecificDeleteConfirm}
                    />
                  </div>
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
      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div
          className="bg-black fixed inset-0 bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={selectedImage}
              className="max-w-full  max-h-screen object-contain"
              alt="Enlarged Quiz Cover"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            />
            <button
              className="absolute top-4 cursor-pointer right-4 text-white text-2xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchquizCard;
