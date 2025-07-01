import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { axiosinstance } from "../AxiosInstance/axios";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";

const FlashCardHistory = () => {
  const [flashcard, setflashcard] = useState([]);
  const [title, settitle] = useState("");

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axiosinstance("/editdelete/flashcardfetch");
      if (res.status === 200) {
        setflashcard(res.data.response);
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const flashcarddelete = async () => {
    try {
      const response = await axiosinstance.delete(
        "/editdelete/flashcardDelete"
      );
      if (response.status === 200) {
        toast.success("Deleted successfully");
        fetchFlashcards(); // Refresh UI
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(error.response.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const specificflashcarddelete = async (cardId, setIndex, cardIndex) => {
    try {
      const response = await axiosinstance.delete(
        `/editdelete/SpecificDeleteFlash/${cardId}`
      );
      if (response.status === 200) {
        toast.success("Card deleted successfully");

        setflashcard((prevSets) => {
          const newSets = [...prevSets];
          newSets[setIndex].cards.splice(cardIndex, 1); // Remove the card

          if (newSets[setIndex].cards.length === 0) {
            newSets.splice(setIndex, 1);
          }

          return newSets;
        });
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to delete card");
    }
  };

  const flashtitleupdate = async () => {
    const response = await axiosinstance.patch("/editdelete/flashTitleupdate", {
      title,
    });
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  return (
    <>
      <input
        type="text"
        name="title"
        id=""
        onChange={(e) => settitle(e.target.value)}
        value={title}
        placeholder="Enter Your Title"
        className="border border-black"
      />
      <button
        onClick={flashtitleupdate}
        className="px-6 py-3 bg-amber-300 text-white rounded-3xl m-5"
      >
        submit
      </button>
      <h1 className="text-center mt-8 font-bold text-4xl">FLASHCARD HISTORY</h1>

      <button
        onClick={flashcarddelete}
        className="bg-red-500 px-6 py-2 cursor-pointer rounded-2xl m-5 text-white"
      >
        Delete
      </button>

      <div className="flex flex-col gap-12 items-center py-10">
        {flashcard.length === 0 ? (
          <p className="text-xl text-gray-500">No flash cards found.</p>
        ) : (
          flashcard.map((flashSet, setIndex) => (
            <div key={setIndex} className="flex flex-col items-center">
              <img
                src={flashSet.imageURl}
                className="mb-10 w-100 rounded-2xl"
                alt=""
              />

              <h2 className="text-2xl font-bold mb-4">
                Subject: {flashSet.subject}
              </h2>
              <h1 className="text-2xl font-bold mb-4">
                Title:{flashSet.title}
              </h1>

              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                style={{ width: "300px", height: "400px" }}
              >
                {flashSet.cards.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      backgroundColor: "#F4D9AE",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "20px",
                      borderRadius: "18px",
                    }}
                  >
                    <div>
                      <button
                        onClick={() =>
                          specificflashcarddelete(item.id, setIndex, index)
                        }
                        className="absolute cursor-pointer top-2 right-2 bg-red-100 rounded-full p-2 hover:bg-red-200"
                        title="Delete Card"
                      >
                        <TrashIcon className="h-6 w-6 text-red-600" />
                      </button>
                    </div>

                    <h3 className="text-lg font-medium text-[1.7vw] text-justify">
                      Q{index + 1}: {item.question}
                    </h3>

                    <p className="mt-4 text-green-700 text-[1.6vw] text-justify font-semibold">
                      Answer: {item.answer}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FlashCardHistory;
