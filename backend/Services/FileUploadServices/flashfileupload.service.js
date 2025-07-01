import FileModel from '../../Models/UserFileUploadModel/file.model.js';
import { decodedToken } from '../../Utils/decodedtoken.js';

export const handleFlashFileUploadService = async (req) => {
  try {
    const filetype = req.file.mimetype.includes('pdf') ? 'pdf' : 'image';
    const UserLoginId = decodedToken(req);

    if (!UserLoginId) {
      return {
        status: 400,
        data: { message: "Please correctly login" }
      };
    }

    const newFile = new FileModel({
      fileUrl: req.file.path,
      filetype,
      UserLoginId
    });

    await newFile.save();

    return {
      status: 200,
      data: {
        message: "FlashCard File uploaded successfully",
        file: newFile
      }
    };
  } catch (error) {
    return {
      status: 500,
      data: { error: 'File upload failed' }
    };
  }
};

