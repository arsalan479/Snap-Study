import { saveQuizcardService } from "../../Services/CardsSaveSevice/quizcard.service.js";
import { handleQuizFileUploadService } from "../../Services/FileUploadServices/quizfileupload.service.js";
import { quizcardgeminiapi } from "../../Services/GeminiApiLogic/quizcardgeminiapi.service.js";

export const quizfileupload = async(req,res)=>{

const response = await handleQuizFileUploadService(req);
return res.status(response.status).json({
  result:response.data
})

};

export const quizcardgeneratefromtext = async(req,res)=>{

const {text} = req.body;

if(!text){
  return res.status(400).json({
    message:"text are required"
  })
}

try{
  const result = await quizcardgeminiapi(text);
return res.status(200).json({
  message:"QuizCard content generated successfully",
  data:result
});
}catch(error){
  res.status(500).json({
    message:`something wrong ${error}`
  })
}


} 

export const quizcardsave = async(req,res)=>{

const response = await saveQuizcardService(req);
return res.status(response.status).json({
    result:response.data
})

}



