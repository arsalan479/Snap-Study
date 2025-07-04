import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { findOrCreateUser } from '../../Services/UserAuthServices/googleauth.service.js';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
  
    const user = await findOrCreateUser(profile);

  

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));


