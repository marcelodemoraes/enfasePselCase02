const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  right_answer: {
    type: Number,
    required: true
  },
  hits: {
    type: Number,
    required: true
  },
  misses: {
    type: Number,
    required: true
  },
  avarage: {
    type: Number,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Question", questionSchema);
