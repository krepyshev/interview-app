const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
