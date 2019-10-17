const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Employer = require('../../database/models/employer');
const Saved = require('../../database/models/saved');

/**
 * @method - POST
 * @url - '/api/savedjobs/:jobid'
 * @data - auth token
 * @action - add new saved doc
 * @access - private
 */
router.post('/:jobid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const saved = new Saved({ job: req.params.jobid, owner: employee._id });

    await saved.save();

    const employeeSavedJobs = await Saved.find({
      owner: employee._id
    }).populate('job');

    const savedObjectsArray = employeeSavedJobs.map(sav => sav.toObject());

    const finalSaved = [];
    for (const sav of savedObjectsArray) {
      const employer = await Employer.findById(sav.job.owner);
      finalSaved.push({
        ...sav,
        job: { ...sav.job, employerName: employer.name }
      });
    }

    res.json({ employeeSavedJobs: finalSaved });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
