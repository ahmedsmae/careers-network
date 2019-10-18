const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Employer = require('../../database/models/employer');
const Application = require('../../database/models/application');

/**
 * @method - DELETE
 * @url - '/api/applications/:applicationid'
 * @data - auth token
 * @action - delete application
 * @access - private
 */
router.delete('/:applicationid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const application = await Application.findById(req.params.applicationid);

    if (!application) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Application does not exists' }] });
    }

    if (employee._id.toString() !== application.owner.toString()) {
      return res.status(400).json({
        errors: [{ msg: 'This application does not belong to this employee' }]
      });
    }

    await application.remove();

    const employeeApplications = await Application.find({
      owner: employee._id
    }).populate('job');

    const appObjectsArray = employeeApplications.map(app => app.toObject());

    const finalApps = [];
    for (const app of appObjectsArray) {
      const employer = await Employer.findById(app.job.owner);
      finalApps.push({
        ...app,
        job: { ...app.job, employerName: employer.name }
      });
    }

    res.json({ employeeApplications: finalApps });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
