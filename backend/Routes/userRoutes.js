import express from "express"
import { Strategy as GitHubStrategy } from 'passport-github';
import formidable from "express-formidable";
import passport from "../Controller/gitHubController.js";
import { loginController, profilePictureController, registerController, searchUser, updateUserInfo, userDetails } from "../Controller/userController.js";


const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});



// In your server-side route handler
router.get('/auth/github', (req, res) => {
  // Redirect the user to GitHub for OAuth authentication
  const githubAuthUrl = 'https://github.com/login/oauth/authorize' +
    '?client_id=a762a21970e572a32d4e' +
    '&redirect_uri=http://localhost:8080/api/v1/auth/github/callback';

  // Send the GitHub OAuth authorization URL back to the client
  res.json({ redirectUrl: githubAuthUrl });
});




router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  (req, res) => {

    const user = req.user;

    // Encode user information in the redirect URL
    const redirectURL = `http://localhost:3000/login?userId=${user.id}&username=${user.username}&userpic={user.profilePicUrl}`;

    // Redirect to home with user information in the URL
    res.redirect(redirectURL);

    // Successful authentication, redirect home.
  });


router.get('/error', (req, res) => res.send("Error logging via gitHub"))




// Normal User Routes

router.post('/register', registerController)

router.post('/login', loginController)

router.put('/updateUser/:userId',updateUserInfo)

// Search The User

router.post('/searchUser',searchUser)

router.get('/user/:userId',userDetails)

router.post('/update-profile-pic/:userId',formidable(),profilePictureController)



export default router;