const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true,
    trim: true
  },
  answer_ids: {
    type: [String]
  },
  answer_text: {
    type: String,
    trim: true
  }
});

const applicationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employee'
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Job'
    },
    answers: {
      type: [answerSchema]
    }
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
