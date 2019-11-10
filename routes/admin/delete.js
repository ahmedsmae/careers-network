const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const User = require('../../database/models/user');
const Admin = require('../../database/models/admin');
const Employer = require('../../database/models/employer');
const Employee = require('../../database/models/employee');
const Job = require('../../database/models/job');
const Application = require('../../database/models/application');

/**
 * @method - DELETE
 * @url - '/api/admin/deleteemployer/:userid'
 * @data - auth token
 * @action - delete user
 * @access - private
 */
router.delete('/deleteemployer/:userid', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const user = await User.findById(req.params.userid);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    await user.remove();

    const allEmployers = await Employer.find().populate('owner', ['email']);

    res.json({ allEmployers });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - DELETE
 * @url - '/api/admin/deleteemployee/:userid'
 * @data - auth token
 * @action - delete user
 * @access - private
 */
router.delete('/deleteemployee/:userid', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const user = await User.findById(req.params.userid);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    await user.remove();

    const allEmployees = await Employee.find().populate('owner', ['email']);

    res.json({ allEmployees });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - DELETE
 * @url - '/api/admin/deletejob/:jobid'
 * @data - auth token
 * @action - delete job
 * @access - private
 */
router.delete('/deletejob/:jobid', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const job = await Job.findById(req.params.jobid);

    if (!job) {
      return res.status(400).json({ errors: [{ msg: 'Job does not exists' }] });
    }

    const owner = job.owner;
    await job.remove();

    const allEmployerJobs = await Job.find({ owner });

    res.json({ allEmployerJobs });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - DELETE
 * @url - '/api/admin/deleteapplication/:applicationid'
 * @data - auth token
 * @action - delete application
 * @access - private
 */
router.delete('/deleteapplication/:applicationid', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const application = await Application.findById(req.params.applicationid);

    if (!application) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Application does not exists' }] });
    }

    const owner = application.owner;
    await application.remove();

    const allEmployeeApplications = await Application.find({ owner });

    res.json({ allEmployeeApplications });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
