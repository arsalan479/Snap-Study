import axios from 'axios';
import { flashcardgeminiapi } from '../../Services/GeminiApiLogic/flashcardgeminiapi.service.js';
import { extractText } from '../../Services/ExtractTextServiceUploadFile/ExtractText.service.js';
import { saveFlashcardService } from '../../Services/CardsSaveSevice/flashcardsave.service.js';
import { handleFlashFileUploadService } from '../../Services/FileUploadServices/flashfileupload.service.js';


export const fileupload =  async(req,res)=>{

  const response = await handleFlashFileUploadService(req);
  return res.status(response.status).json({
    result:response.data
  })

};

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

export const flashcardgeneratefromtext = async(req,res)=>{

const {text } = req.body;

if(!text){
  return res.status(400).json({
    message:"text are required"
  })
}

try{
  const result = await flashcardgeminiapi(text);
return res.status(200).json({
  message:"flashcard content generated successfully",
  data:result
});
}catch(error){
  res.status(500).json({
    message:`something wrong ${error}`
  })
}


} 

export const flashcardsave = async(req,res)=>{

const response = await saveFlashcardService(req)
return res.status(response.status).json({
  result:response.data
})

}



