const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');
const Follow = require('../../database/models/follow');

/**
 * @method - DELETE
 * @url - '/api/follows/:followid'
 * @data - auth token
 * @action - delete follow
 * @access - private
 */
router.delete('/:followid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const follow = await Follow.findById(req.params.followid);

    if (!follow) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Follow document does not exists' }] });
    }

    if (follow.owner.toString() !== employee._id.toString()) {
      return res.status(400).json({
        errors: [{ msg: 'Follow document does not belong to this employee' }]
      });
    }

    await follow.remove();

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
