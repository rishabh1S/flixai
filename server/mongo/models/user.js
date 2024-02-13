import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: String,
  userId: {
    type: String,
    unique: true,
  },
  createdPostIds: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
