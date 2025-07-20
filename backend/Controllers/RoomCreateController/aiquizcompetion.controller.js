import { quiztopictext } from "../../Services/GeminiApiLogic/aicomptopic.service.js";

export const aitopicsendtext = async(req,res)=>{
try {
    
const {prompt} = req.body;

if (!prompt) {
  return res.status(400).json({ message: "Prompt is required" });
}

const response = await quiztopictext(prompt);

return res.status(200).json({
    data:response
})
} catch (error) {
  return res.status(500).json({
    message:error.message
  })  
}
}




