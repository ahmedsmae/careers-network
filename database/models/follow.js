const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employee'
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employer'
    }
  },
  { timestamps: true }
);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
