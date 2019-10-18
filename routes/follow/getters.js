const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Follow = require('../../database/models/follow');

/**
 * @method - GET
 * @url - '/api/follows'
 * @data - auth token
 * @action - get all employee follows
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
