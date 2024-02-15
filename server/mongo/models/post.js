import mongoose from "mongoose";

const Post = new mongoose.Schema({
  username: { type: String, required: true },
  userProfileUri: { type: String, required: true },
  imageURL: { type: String, required: true },
  tempImageURL: { type: String, required: true, unique: true },
  prompt: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
