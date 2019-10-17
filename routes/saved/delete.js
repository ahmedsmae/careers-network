const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Employer = require('../../database/models/employer');
const Saved = require('../../database/models/saved');

/**
 * @method - DELETE
 * @url - '/api/savedjobs/:savedid'
 * @data - auth token
 * @action - delete saved doc
 * @access - private
 */
router.delete('/:savedid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const saved = await Saved.findById(req.params.savedid);
    if (!saved) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Saved document does not exists' }] });
    }

    if (saved.owner.toString() !== employee._id.toString()) {
      return res.status(400).json({
        errors: [{ msg: 'Saved document does not belong to this employee' }]
      });
    }

    await saved.remove();

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
