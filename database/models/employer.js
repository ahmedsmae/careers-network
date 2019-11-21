const mongoose = require('mongoose');

const Job = require('./job');
const Follow = require('./follow');
const { contactNumberSchema } = require('./asset-schemas');

const employerSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      trim: true
    },
    speciality: {
      type: String,
      trim: true
    },
    kind: {
      type: String,
      trim: true
    },
    size: {
      type: String,
      trim: true
    },
    contact_numbers: [contactNumberSchema],
    location_id: {
      type: String
    },
    bio: {
      type: String,
      trim: true
    },
    avatar: {
      type: Buffer
    },
    cover: {
      type: Buffer
    },
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
    }
  },
  { timestamps: true }
);

employerSchema.methods.toJSON = function() {
  const employer = this;
  const employerObject = employer.toObject();
  delete employerObject.avatar;
  delete employerObject.cover;

  return employerObject;
};

// remove employee applications deleting themselves
employerSchema.pre('remove', async function(next) {
  const employer = this;

  await Job.deleteMany({ owner: employer._id });
  await Follow.deleteMany({ employer: employer._id });

  next();
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
