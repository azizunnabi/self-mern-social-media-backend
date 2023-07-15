const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    body: {
      required: true,
      type: String,
    },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    post: { type: mongoose.Types.ObjectId, ref: "post" },
  },

  { timestamps: true }
);
const CommentModel = mongoose.model("comment", commentSchema);
module.exports = CommentModel;
