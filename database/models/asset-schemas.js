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

const contactNumberSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  contact_number: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = {
  educationSchema,
  experienceSchema,
  trainingsCertificationsSchema,
  languagesSchema,
  skillsSchema,
  interestsSchema,
  referencesSchema,
  contactNumberSchema
};
