import passport from "passport";
import GitHubStrategy from 'passport-github2';
import session from 'express-session';
import userModel from "../Models/userModel.js";


// app.use(passport.initialize());
// app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: 'a762a21970e572a32d4e',
    clientSecret: 'f6f1afb857a174a0843d6e604f098d2cc7e0639c',
    callbackURL: 'https://social-media-app-5eap.onrender.com/api/v1/auth/github/callback'
  },

  
  async (accessToken, refreshToken, profile, done) => {
    try {
      
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('profile:', profile);
      
      // This is for Profile Pic Url
      const profilePicUrl = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;

      // This is for Profile Email It will help in while adding the manual data It will not overwrite
      const profile_email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

      let user = await userModel.findOne({
        account_id: profile.id,
      });

      if (!user) {

         user = await userModel.create({
          account_id: profile.id,
          name: profile.username,
          email:profile_email,
          profile_pic_url: profilePicUrl,
          // email: profile.emails[0].value
        })
      }
        return done(null, user);
    }catch (error) {
        console.error("Error:", error);
        return done(error);
      }

     
    } 
  
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
