import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    unique: true,
  },
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: String,
      },
    ],
    default: [],
  },
  description: String,
  imageUri: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
