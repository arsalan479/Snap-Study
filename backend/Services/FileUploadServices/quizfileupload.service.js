    import { decodedToken } from "../../Utils/decodedtoken.js";
    import quizcardfilemodel from "../../Models/QuizCarsSystemModel/quizcardfile.model.js";

    export const handleQuizFileUploadService = async (req) => {
      try {

        const filetype = req.file.mimetype.includes('pdf') ? 'pdf' : 'image';
        const UserLoginId = decodedToken(req);

        if (!UserLoginId) {
          return {
            status: 400,
            data: { message: "Please correctly login" }
          };
        }

        const newFile = new quizcardfilemodel({
          fileUrl: req.file.path,
          filetype,
          UserLoginId
        });

        await newFile.save();

        return {
          status: 200,  
          data: {
            message: "QuizCard File uploaded successfully",
            file: newFile,
          }
        };
      } catch (error) {
        return {
          status: 500,
          errors:error
        };
      }
    };
