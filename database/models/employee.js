const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  subject: {
    type: String,
    trim: true,
    required: true
  },
  institute: {
    type: String,
    trim: true,
    required: true
  },
  location_id: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  from: {
    type: Date
  },
  current: {
    type: Boolean
  },
  to: {
    type: Date
  },
  certificate_image: {
    type: Buffer
  }
});

const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
    trim: true,
    required: true
  },
  organization: {
    type: String,
    trim: true,
    required: true
  },
  location_id: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  from: {
    type: Date
  },
  current: {
    type: Boolean
  },
  to: {
    type: Date
  },
  certificate_image: {
    type: Buffer
  }
});

const employeeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    middle_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    contact_number: {
      type: String
    },
    location_id: {
      type: String
    },
    web_site: {
      type: String
    },
    bio: {
      type: String,
      trim: true
    },
    avatar: {
      type: Buffer
    },
    educations: [educationSchema],
    experiences: [experienceSchema]
  },
  { timestamps: true }
);

// remove employee applications deleting themselves
employeeSchema.pre('remove', async function(next) {
  const employee = this;

  // remove applications
  // await Book.deleteMany({ owner: employee._id });

  // remove follows

  // remove bookmarks

  // remove reviews

  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
