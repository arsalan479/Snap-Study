import UserOne from '../../Models/UserOneScehma/UserOne.model.js';

export const findOrCreateUser = async (profile) => {
  try {
 
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error('Google profile missing email address');
    }

    let user = await UserOne.findOne({ 'authMethods.google.id': profile.id });
    if (user){
      
      return user;

    }
      

    const existingUser = await UserOne.findOne({ email });
    if (existingUser) {
      return {
        exists:true,
      }

    }

    user = await UserOne.create({
      email, 
      displayName: profile.displayName || 'Google User',
      avatar: profile.photos?.[0]?.value || '',
      authMethods: {
        google: {
          id: profile.id,
          verified: true
        }
      },
    });

    return user;

  } catch (error) {
    console.error('User creation failed:', error.message);
    throw error; 
  }
};