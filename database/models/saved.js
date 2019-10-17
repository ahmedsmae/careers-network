const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema(
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
    }
  },
  { timestamps: true }
);

const Saved = mongoose.model('Saved', savedSchema);

module.exports = Saved;
