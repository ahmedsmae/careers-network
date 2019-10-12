const mongoose = require('mongoose');

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
    contact_numbers: [contactNumberSchema],
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
    cover: {
      type: Buffer
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

  // remove jobs
  // await Book.deleteMany({ owner: employee._id });

  // remove follows

  // remove bookmarks

  // remove reviews

  next();
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
