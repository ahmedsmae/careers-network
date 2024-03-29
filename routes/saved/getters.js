const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Employer = require('../../database/models/employer');
const Saved = require('../../database/models/saved');

/**
 * @method - GET
 * @url - '/api/savedjobs'
 * @data - auth token
 * @action - get all employee saved jobs
 * @access - private
 */
router.get('/', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const employeeSavedJobs = await Saved.find({
      owner: employee._id
    }).populate('job');

    const savedObjectsArray = employeeSavedJobs.map(sav => sav.toObject());

    const finalSaved = [];
    for (const sav of savedObjectsArray) {
      const employer = await Employer.findById(sav.job.owner);
      finalSaved.push({
        ...sav,
        job: { ...sav.job, owner: employer }
      });
    }

    res.json({ employeeSavedJobs: finalSaved });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
