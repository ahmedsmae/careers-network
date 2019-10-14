const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Application = require('../../database/models/application');

/**
 * @method - POST
 * @url - '/api/applications/'
 * @data - { job_id, answers }
 * @action - add new application
 * @access - private
 */
router.post('/', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const application = new Application({ ...req.body, owner: employee._id });

    await application.save();

    const employeeApplications = await Application.find({
      owner: employee._id
    });

    res.json({ employeeApplications });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - PATCH
 * @url - '/api/applications/'
 * @data - { _id, owner, job_id, answers }
 * @action - update existing application
 * @access - private
 */
router.patch('/', auth, async (req, res) => {
  const { _id, owner, job_id, answers } = req.body;

  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    if (owner != employee._id) {
      return res.status(400).json({
        errors: [{ msg: 'This application does not belong to this employee' }]
      });
    }

    const application = await Application.findById(_id);

    if (!application) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Application does not exists' }] });
    }

    if (job_id) application.job_id = job_id;
    if (answers) application.answers = answers;

    await application.save();

    const employeeApplications = await Application.find({
      owner: employee._id
    });

    res.json({ employeeApplications });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
