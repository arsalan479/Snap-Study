// src/context/QuizCardContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosinstance } from "../AxiosInstance/axios";
import toast from "react-hot-toast";

const QuizCardContext = createContext();

export const QuizCardCrudContext = ({ children }) => {
  
  const [quizcards, setCards] = useState([]);

  const fetchQuizCards = async () => {
   
    const isFetched = localStorage.getItem("quizCardsFetched");
    try {
      const response = await axiosinstance.get("/api/quiz/crud/quizcardfetch");

      setCards(response.data.response);

      if (!isFetched) {
        localStorage.setItem("quizCardsFetched", "true");
      }
    } catch (error) {
      console.log("Failed to fetch quiz cards.");
    }
  };

const deleteSpecificQuizCard = async (cardId) => {
  try {
    const response = await toast.promise(
      axiosinstance.delete(`/api/quiz/crud/specificquizcardDelete/${cardId}`),
      {
        loading: "Deleting Quiz card...",
        success: "Quiz card deleted!",
      }
    );

    if (response.status === 200) {
      setCards((prevCards) =>
        prevCards.map((subjectGroup) => ({
          ...subjectGroup,
          sets: subjectGroup.sets.map((set) => ({
            ...set,
            cards: set.cards?.filter((card) => card.id !== cardId) || [],
          })),
        }))
      );
    }
  } catch (error) {
    toast.error("Failed to delete card.");
  }
};

const deleteAllQuizCards = async (subject) => {
  try {
    const response = await toast.promise(
      axiosinstance.delete(`/api/quiz/crud/allquizcardDelete/${subject}`),
      {
        loading: `Deleting All ${subject} Quiz cards...`,
        success: `All ${subject} Quiz cards deleted!`,
      }
    );

    if (response.status === 200) {
  setCards((prevCards) =>
        prevCards.filter((group) => group.subject !== subject)
      );

      localStorage.removeItem("quizCardsFetched");  }
  } catch (error) {
    toast.error("Failed to delete all cards.");
  }
};

const cardDelete = async (objId) => {
  try {
    const response = await toast.promise(
      axiosinstance.delete(`/api/quiz/crud/cardDelete/${objId}`),
      {
        loading: "Quiz Object Deleting...",
        success: "Quiz Object Successfully Deleted",
        error: "Failed to delete",
      }
    );

    if (response.status === 200) {
      setCards((prevGroups) =>
        prevGroups.map((group) => ({
          ...group,
          sets: group.sets.filter((set) => set.id !== objId),
        }))
      );
    }
  } catch (error) {
    toast.error("Failed to delete set.");
  }
};

  useEffect(() => {
    fetchQuizCards();
  }, []);

  return (
    <QuizCardContext.Provider
      value={{
        cardDelete,
        quizcards,
        fetchQuizCards,
        deleteSpecificQuizCard,
        deleteAllQuizCards,
      }}
    >
      {children}
    </QuizCardContext.Provider>
  );
};

export const useQuizCard = () => useContext(QuizCardContext);
