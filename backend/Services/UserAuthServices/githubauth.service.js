import UserOne from '../../Models/UserOneScehma/UserOne.model.js';

export const findOrCreateUser = async (profile, email) => {
  try {
    const avatar = profile.photos?.[0]?.value || '';

    let user = await UserOne.findOne({ 'authMethods.github.id': profile.id });

    if(user){
      return user;
    }
const existingUser = await UserOne.findOne({ email });
    if (existingUser) {
      return {
        exists:true
      }
    }
  
      user = await UserOne.create({
        displayName: profile.displayName || profile.username ,
        email,
        avatar,
        authMethods:{
          github:{
            id:profile.id,
            verified:true,
          }
        }

      });
   

  } catch (err) {
    console.error("Error in findOrCreateUser:", err);
    return null;
  }
};
