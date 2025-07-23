import UserOne from "../Models/UserOneScehma/UserOne.model.js"

export const deductCredits = async(userId, amount = 10) => {
    const user = await UserOne.findById(userId);

    if(!user){
        throw new Error("User not found");
    }

    if(user.credits < amount) {
        throw new Error("Insufficient credits");
    }

    user.credits -= amount;
    await user.save();

    return user.credits; 
}