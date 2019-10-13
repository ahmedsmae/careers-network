const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answer_text: {
    type: String,
    required: true,
    trim: true
  }
});

const questionSchema = new mongoose.Schema({
  question_type: {
    type: String,
    required: true,
    trim: true
  },
  question_text: {
    type: String,
    required: true,
    trim: true
  },
  answer_options: {
    type: [answerSchema]
  }
});

const jobSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employer'
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    location_id: {
      type: String
    },
    referance_number: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      default: 'AVAILABLE',
      trim: true
    },
    applying_email: {
      type: String,
      required: true,
      trim: true
    },
    applying_link: {
      type: String,
      trim: true
    },
    responsibilities: {
      type: String,
      required: true,
      trim: true
    },
    requirements: {
      type: String,
      required: true,
      trim: true
    },
    min_salary: {
      type: String,
      trim: true
    },
    max_salary: {
      type: String,
      trim: true
    },
    currency: {
      type: String,
      trim: true
    },
    other_info: {
      type: String,
      trim: true
    },
    keywords: {
      type: [String]
    },
    expiry: {
      type: Date
    },
    questions: {
      type: [questionSchema]
    }
  },
  { timestamps: true }
);

// remove employee applications deleting themselves
jobSchema.pre('remove', async function(next) {
  const job = this;

  // remove applications
  // await Book.deleteMany({ owner: employee._id });

  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
