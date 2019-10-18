const mongoose = require('mongoose');

const Follow = require('./follow');
const Saved = require('./saved');
const Application = require('./application');

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
      trim: true
    },
    middle_name: {
      type: String,
      trim: true
    },
    last_name: {
      type: String,
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

employeeSchema.methods.toJSON = function() {
  const employee = this;
  const employeeObject = employee.toObject();
  delete employeeObject.avatar;

  employeeObject.educations = employeeObject.educations.map(
    ({ certificate_image, ...rest }) =>
      certificate_image
        ? { ...rest, hasCertificate: true }
        : { ...rest, hasCertificate: false }
  );

  employeeObject.experiences = employeeObject.experiences.map(
    ({ certificate_image, ...rest }) =>
      certificate_image
        ? { ...rest, hasCertificate: true }
        : { ...rest, hasCertificate: false }
  );

  return employeeObject;
};

// remove employee applications deleting themselves
employeeSchema.pre('remove', async function(next) {
  const employee = this;

  await Application.deleteMany({ owner: employee._id });
  await Saved.deleteMany({ owner: employee._id });
  await Follow.deleteMany({ owner: employee._id });

  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
