import quizcardmodel from '../../Models/QuizCarsSystemModel/quizcard.model.js';
import flashcardmodel from '../../Models/UserFileUploadModel/flashcard.model.js';

export const AlldeleteUserQuizCards = async (userId,subject) => {
  
  const result = await quizcardmodel.deleteMany({ UserLoginId: userId , Subjects:subject });
  
  if (result.deletedCount === 0) {
    throw new Error("Quiz cards not found for this user");
  }
  
  return {
    success: true,
    deletedCount: result.deletedCount
  };
};

export const AlldeleteUserFlashCards = async (userId) => {
  const result = await flashcardmodel.deleteMany({ UserLoginId: userId });
  
  if (result.deletedCount === 0) {
    throw new Error("Quiz cards not found for this user");
  }
  
  return {
    success: true,
    deletedCount: result.deletedCount
  };
};

export const deleteSpecificQuizCard = async (userId, cardId) => {
  const result = await quizcardmodel.updateOne(
    { 
      UserLoginId: userId,
      "Cards._id": cardId 
    },
    { $pull: { Cards: { _id: cardId } } }
  );

  if (result.modifiedCount === 0) {
    throw new Error("Quiz card not found or already deleted");
  }

  return {
    success: true,
    modifiedCount: result.modifiedCount
  };
};

export const deleteSpecificflashCard = async (userId, cardId) => {
  
  const result = await flashcardmodel.updateOne(
    { 
      UserLoginId: userId,
      "Cards._id": cardId 
    },
    { $pull: { Cards: { _id: cardId } } }
  );

  if (result.modifiedCount === 0) {
    throw new Error("Quiz card not found or already deleted");
  }

  return {
    success: true,
    modifiedCount: result.modifiedCount
  };
};

export const deleteEntireQuizCardDocument = async (userId,objId) => {
  const result = await quizcardmodel.findOneAndDelete({
    UserLoginId: userId,
    _id:objId

  });

  if (!result) {
    console.log("Quiz card document not found");
  }

  return {
    success: true,
    deletedDocument: result // Returns the deleted document
  };
};