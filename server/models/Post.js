const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  content: {
    type: String,
    required: true
  },

  likes:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        text: {
            type: String
        }
    }
]

  



}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);


