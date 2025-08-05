import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/QuizCardsContext";
import { axiosinstance } from "../../AxiosInstance/axios";
import toast from "react-hot-toast";

const QuizCardSave = () => {
  const [title, settitle] = useState("");
  const [hasSaved, setHasSaved] = useState(false);

  const { FileUrl, Cards, setisProcessing, setSaveQuizCard } =
    useContext(AppContext);

  const subject = localStorage.getItem("subject");

 const handleSave = async () => {
  if (!title) {
    toast.error("Title is required");
    return false; // returning false so parent knows it didn't save
  }

  if (!subject || !FileUrl || !Cards?.length) {
    toast.error("Missing data to save quiz card");
    return false;
  }

  setisProcessing(true);

  try {
    await toast.promise(
      axiosinstance.post("/api/quiz/quizcard-save", {
        fileUrl: FileUrl,
        Title: title,
        Subjects: subject,
        Cards,
      }),
      {
        loading: "Saving quiz card...",
        success: "Quiz card saved successfully!",
      }
    );
    return true; // saved successfully
  } catch (error) {
    toast.error(
      error?.response?.data?.result?.message || "Something went wrong."
    );
    return false;
  } finally {
    setisProcessing(false);
  }
};


  useEffect(() => {
    setSaveQuizCard(() => handleSave);
  }, [FileUrl, Cards, title, subject]);

  return (
    <div className="flex justify-center items-center">
      <form className="flex flex-col gap-4 ">
        <label htmlFor="" className="text-center text-xl">Enter Your Image Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
            setHasSaved(false); // allow save again if title is changed
          }}
          placeholder="Enter Your Image Title"
          className="px-4 py-2 mb-7 border rounded-md focus:outline-none focus:ring-2 focus:ring-white w-130" // reduced width
        />
      </form>
    </div>
  );
};

export default QuizCardSave;
