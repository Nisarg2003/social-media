import mongoose from "mongoose"

const userModel = new mongoose.Schema({
  account_id: {
    type: String,
    required: false,
    trim: true
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,

  },
  password: {
    type: String,

  },
  bio: {
    type: String,
  },
  // This Profile pic stores the buffer for manually enter the data 
  profile_pic: {
    data: Buffer,
    contentType: String,
  },

  // This will stores the profile pic coming from the github
  profile_pic_url: {
    type: String // Store the URL as a string
  },



},
  { timestamps: true }
);

export default mongoose.model("User", userModel);