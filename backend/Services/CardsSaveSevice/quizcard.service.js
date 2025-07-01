import quizcardmodel from '../../Models/QuizCarsSystemModel/quizcard.model.js';
import { decodedToken } from '../../Utils/decodedtoken.js';

export const saveQuizcardService = async (req) => {

  const { fileUrl, Title, Subjects, Cards } = req.body;
  const userId = decodedToken(req);

  if (!userId || !fileUrl || !Title || !Subjects || !Cards) {
    return { status: 400, data: { message: "Missing Or Invalid Fields" } };
  }

  try {
    const flashcardentry = new quizcardmodel({
      UserLoginId: userId,
      fileUrl,
      Title,
      Subjects,
      Cards,
    });

    await flashcardentry.save();

    return {
      status: 200,
      data: {
        message: "QuizCards saved successfully",
        data: flashcardentry,
      },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: `Something went wrong: ${error.message}` },
    };
  }
};
