import React, { useEffect, useState } from "react";
import { axiosinstance } from "../AxiosInstance/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import toast from "react-hot-toast";
import { TrashIcon,PencilSquareIcon } from "@heroicons/react/24/outline";

const FlashCardUI = () => {
  const [quizSets, setQuizSets] = useState([]);
  const [title, settitle] = useState("");
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => { 
    fetchQuizcards();
  }, []);

  const fetchQuizcards = async () => {
    try {
      const res = await axiosinstance("/editdelete/quizcardfetch");
      if (res.status === 200) {
        setQuizSets(res.data.response);
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const quizdelete = async () => {
    try {
      const response = await axiosinstance.delete("/editdelete/quizcardDelete");
      if (response.status === 200) {
        toast.success("Deleted successfully");
        fetchQuizcards();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const specificquizcardelet = async (cardId, setIndex, cardIndex) => {
    try {
      const response = await axiosinstance.delete(
        `/editdelete/SpecificDelete/${cardId}`
      );
      if (response.status === 200) {
        toast.success("Card deleted successfully");

        setQuizSets((prevSets) => {
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

  const titlesubmit = async (objectId) => {

    const response = await axiosinstance.patch(`/editdelete/quizTitleupdate/${objectId}`,{title})

    if(response.status === 200){
      console.log(response.data)
      
    }
  };


  
  return (
    <>
      <input
        type="text"
        name="Title"
        id=""
        value={title}
        onChange={(e) => settitle(e.target.value)}
        placeholder="Enter Your Title"
        className="border border-black"
      />
   

      <h1 className="text-center mt-8 font-bold text-4xl">QUIZCARD HISTORY</h1>

      <button
        onClick={quizdelete}
        className="bg-red-500 px-6 py-2 cursor-pointer rounded-2xl m-5 text-white"
      >
        Delete
      </button>

      <div className="flex flex-col gap-12 items-center py-10">
        {quizSets.length === 0 ? (
          <p className="text-xl text-gray-500">No quiz cards found.</p>
        ) : (
          quizSets.map((quizSet, setIndex) => (
            
      <div key={setIndex} className="flex flex-col items-center">
              <img
                src={quizSet.imageURl}
                className="w-100 rounded-2xl"
                alt=""
              />

         
              <h2 className="text-2xl font-bold mb-4">
                Subject: {quizSet.subject}
              </h2>

              <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">Title:{quizSet.title}
               <span 
               onClick={()=>{
                titlesubmit(quizSet.id)
               }}
               >
                <PencilSquareIcon className="text-blue-500 w-7 h-7"/>
                </span> 
              </h1>

              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                style={{ width: "300px", height: "400px" }}
              >
                {quizSet.cards.map((item, index) => (
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
                          specificquizcardelet(item.id, setIndex, index)
                        }
                        className="absolute top-2 right-2 bg-red-100 rounded-full p-2 hover:bg-red-200"
                        title="Delete Card"
                      >
                        <TrashIcon className="h-6 w-6 text-red-600" />
                      </button>
                    </div>
                    <h3 className="text-lg font-medium text-[1.7vw] text-justify">
                      Q{index + 1}: {item.question}
                    </h3>
                    <ul className="text-left w-full text-[1.6vw] text-justify">
                      {item.options.map((opt, idx) => (
                        <li className="pt-2" key={idx}>
                          {idx + 1}. {opt}
                        </li>
                      ))}
                    </ul>
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

export default FlashCardUI;
