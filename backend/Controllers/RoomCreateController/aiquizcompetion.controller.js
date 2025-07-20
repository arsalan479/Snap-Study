import { quiztopictext } from "../../Services/GeminiApiLogic/aicomptopic.service.js";
import { aicompetationprompt } from "../../Utils/GeminiPrompts/prompt.js";

export const aitopicsendtext = async(req,res)=>{
try {
    
const {topicName,numberofquestions,levels} = req.body;

const prompt = aicompetationprompt(numberofquestions,topicName,levels);

if (!topicName || !numberofquestions || !levels) {
  return res.status(400).json({ message: "topic name or number of question or levels is required" });
}

const response = await quiztopictext(prompt);

return res.status(200).json({
    response
})


} catch (error) {
  return res.status(500).json({
    message:error.message
  })  
}
}



