import quizcardmodel from "../../Models/QuizCarsSystemModel/quizcard.model.js";
import { groupQuizCardsBySubject } from "../../Utils/filteringquizcardsubjectwise.js";


export const fetchdatacardquiz = async(userId)=>{

    try {
        const response = await quizcardmodel.find({
              UserLoginId:userId,
        })

    const groupedCards = response.map((item) => ({
      id:item._id,
      subject: item.Subjects,
      title : item.Title,
      imageURl:item.fileUrl,
      cards: item.Cards.map(card => ({
         id:card._id,
        question: card.question,
        answer: card.answer,
        options: card.options
      }))
    }));

const groupedBySubjects = groupQuizCardsBySubject(groupedCards)

    return groupedBySubjects

    } catch (error) {
     throw new Error("Error fetching flashcards");

    }
    
}