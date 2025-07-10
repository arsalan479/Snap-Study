import { saveQuizcardService } from "../../Services/CardsSaveSevice/quizcard.service.js";
import { handleQuizFileUploadService } from "../../Services/FileUploadServices/quizfileupload.service.js";
import { quizcardgeminiapi } from "../../Services/GeminiApiLogic/quizcardgeminiapi.service.js";
import {GoogleGenerativeAI} from '@google/generative-ai'

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


export const quizcardexplain = async(req,res)=>{

try {
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const {question,options,answer} = req.body;

  const prompt = `Explain logically and in simple terms why the correct answer to the following multiple-choice question is correct:\n\nQuestion: ${question}\nOptions: ${options.join(", ")}\nCorrect Answer: ${answer}`


  const model = genAI.getGenerativeModel({model:"gemini-1.5-flash-latest"})
  const result = await model.generateContent(prompt)
  const response = await result.response;
 const explanation =  response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No explanation found.';

      if (!explanation) {
      return res.status(500).json({ error: "Failed to generate explanation text." });
    }


  res.status(200).json({
    explanation,
  })

} catch (err) {
  console.error('Error in explainQuestion:', err);
    res.status(500).json({ error: 'Failed to generate explanation.' });
}

}


