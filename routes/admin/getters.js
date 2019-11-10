const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Admin = require('../../database/models/admin');
const Employer = require('../../database/models/employer');
const Employee = require('../../database/models/employee');
const Job = require('../../database/models/job');
const Application = require('../../database/models/application');

/**
 * @method - GET
 * @url - '/api/admin/allemployers'
 * @data - auth token
 * @action - get all employers list
 * @access - private
 */
router.get('/allemployers', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const allEmployers = await Employer.find().populate('owner', ['email']);

    res.json({ allEmployers });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/admin/allemployees'
 * @data - auth token
 * @action - get all employees list
 * @access - private
 */
router.get('/allemployees', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const allEmployees = await Employee.find().populate('owner', ['email']);

    res.json({ allEmployees });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/admin/alladmins'
 * @data - auth token
 * @action - get all admins list
 * @access - private
 */
router.get('/alladmins', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const allAdmins = await Admin.find().populate('owner', ['email']);

    res.json({ allAdmins });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/admin/alljobs/:employerid'
 * @data - auth token
 * @action - get all jobs for specific employer
 * @access - private
 */
router.get('/alljobs/:employerid', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const allEmployerJobs = await Job.find({ owner: req.params.employerid });

    res.json({ allEmployerJobs });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/admin/allapplications/:employeeid'
 * @data - auth token
 * @action - get all jobs for specific employer
 * @access - private
 */
router.get('/allapplications/:employeeid', auth, async (req, res) => {
  try {
    const admin = await Admin.findOne({ owner: req.user._id });

    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Admin does not exists' }] });
    }

    const allEmployeeApplications = await Application.find({
      owner: req.params.employeeid
    });

    res.json({ allEmployeeApplications });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
