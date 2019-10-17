const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employer = require('../../database/models/employer');
const Employee = require('../../database/models/employee');
// const Following = require('../../database/models/following')
const Job = require('../../database/models/job');
const Application = require('../../database/models/application');

/**
 * @method - GET
 * @url - '/api/applications/allemployee'
 * @data - auth token
 * @action - get all employee applications
 * @access - private
 */
router.get('/allemployee', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

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
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/applications/:jobid'
 * @data - auth token
 * @action - get all job applications
 * @access - private
 */
router.get('/:jobid', auth, async (req, res) => {
  try {
    const employer = await Employer.findOne({ owner: req.user._id });

    if (!employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer does not exists' }] });
    }

    const job = await Job.findById(req.params.jobid);

    if (!job) {
      return res.status(400).json({ errors: [{ msg: 'Job does not exists' }] });
    }

    if (employer._id.toString() !== job.owner.toString()) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer does not own this job' }] });
    }

    const jobApplications = await Application.find({
      job: job._id
    }).populate('owner');

    res.json({ jobApplications });
  } catch (err) {
    console.error('server error', err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
