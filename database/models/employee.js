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
  salary: {
    type: String,
    trim: true
  },
  currency: {
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

const trainingsCertificationsSchema = new mongoose.Schema({
  kind: {
    type: String,
    trim: true,
    required: true
  },
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

const languagesSchema = new mongoose.Schema({
  language: {
    type: String,
    trim: true,
    required: true
  },
  level: {
    type: String,
    trim: true,
    required: true
  }
});

const skillsSchema = new mongoose.Schema({
  skill: {
    type: String,
    trim: true,
    required: true
  },
  level: {
    type: String,
    trim: true,
    required: true
  }
});

const interestsSchema = new mongoose.Schema({
  interest: {
    type: String,
    trim: true,
    required: true
  },
  award: {
    type: String,
    trim: true
  }
});

const referencesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  position: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  contact_number: {
    type: String,
    trim: true
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
    gender: {
      type: String,
      trim: true
    },
    birth_date: {
      type: Date
    },
    nationality: {
      type: String,
      trim: true
    },
    religion: {
      type: String,
      trim: true
    },
    marital_status: {
      type: String,
      trim: true
    },
    number_of_dependents: {
      type: String
    },
    residence_country: {
      type: String,
      trim: true
    },
    visa_type: {
      type: String,
      trim: true
    },
    location_id: {
      type: String
    },
    contact_number: {
      type: String
    },
    driving_licences: {
      type: String,
      trim: true
    },
    has_a_car: {
      type: Boolean
    },
    bio: {
      type: String,
      trim: true
    },
    avatar: {
      type: Buffer
    },
    educations: [educationSchema],
    experiences: [experienceSchema],
    trainings_certifications: [trainingsCertificationsSchema],
    languages: [languagesSchema],
    skills: [skillsSchema],
    interests: [interestsSchema],
    references: [referencesSchema],
    social_profiles: {
      website: {
        type: String,
        lowercase: true,
        trim: true
      },
      linkedin: {
        type: String,
        lowercase: true,
        trim: true
      },
      twitter: {
        type: String,
        lowercase: true,
        trim: true
      },
      github: {
        type: String,
        lowercase: true,
        trim: true
      },
      stackoverflow: {
        type: String,
        lowercase: true,
        trim: true
      },
      facebook: {
        type: String,
        lowercase: true,
        trim: true
      },
      instagram: {
        type: String,
        lowercase: true,
        trim: true
      },
      youtube: {
        type: String,
        lowercase: true,
        trim: true
      }
    },
    prefered_jobs_settings: {
      keywords: {
        type: [String]
      },
      location_ids: {
        type: [String]
      }
    }
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

  employeeObject.trainings_certifications = employeeObject.trainings_certifications.map(
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
