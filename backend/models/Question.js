const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  timeToLearn: { type: Number, required: true },
  learned: { type: Boolean, default: false },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
