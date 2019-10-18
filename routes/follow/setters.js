const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Employer = require('../../database/models/employer');
const Follow = require('../../database/models/follow');

/**
 * @method - POST
 * @url - '/api/follows/:employerid'
 * @data - auth token
 * @action - add new follow doc
 * @access - private
 */
router.post('/:employerid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const employer = await Employer.findById(req.params.employerid);

    if (!employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer does not exists' }] });
    }

    const follow = new Follow({
      employer: employer._id,
      owner: employee._id
    });

    await follow.save();

    const employeeFollows = await Follow.find({
      owner: employee._id
    }).populate('employer');

    res.json({ employeeFollows });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
