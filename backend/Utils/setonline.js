import UserOne from "../Models/UserOneScehma/UserOne.model.js";

export const setonline = async (userId) => {

 const response = await UserOne.findByIdAndUpdate(
  {_id:userId},
  {$set:{status:"online"}},
  {new:true}

)
  return response;
};
