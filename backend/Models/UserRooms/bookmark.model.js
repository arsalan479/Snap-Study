  import mongoose from "mongoose";

  const bookmarkSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserOne",
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizcards",
      required: true,
    },
    cards: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        options: [String],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
  export default Bookmark;
