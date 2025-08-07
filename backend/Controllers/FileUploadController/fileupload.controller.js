import axios from 'axios';
import { extractText } from '../../Services/ExtractTextServiceUploadFile/ExtractText.service.js';

export const extractTextFromImage = async (req, res) => {
 
  const fileUrl = req.body.fileUrl;


  if (!fileUrl ){
    return res.status(400).json({ message: "fileUrl is required" });
  }

  try {
    
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const extractedText = await extractText(response.data);
    

    return res.status(200).json({
      message: 'Text extracted successfully',
      text: extractedText
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Failed to extract text',
      error: error.message
    });
  }
};




