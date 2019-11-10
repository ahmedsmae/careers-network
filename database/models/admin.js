const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
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
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
