import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import axios from 'axios'; // ✅ Required to fetch emails manually
import { findOrCreateUser } from '../../Services/UserAuthServices/githubauth.service.js';

dotenv.config();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope:['user:email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let email = profile.emails?.[0]?.value;
    if (!email) {
      const { data } = await axios.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${accessToken}`,
          'User-Agent': 'SnapStudy-App'
        }
      });

      const primaryEmail = data.find(e => e.primary && e.verified);
      email = primaryEmail?.email || 'no-email@example.com';
    }

    const user = await findOrCreateUser(profile, email);

    done(null, user); 
  } catch (err) {
    console.error("GitHub Strategy Error:", err);
    done(err, null);
  }
}));



