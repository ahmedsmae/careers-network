const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../utils/auth');
const User = require('../../database/models/user');
const Admin = require('../../database/models/admin');
const Employer = require('../../database/models/employer');
const Employee = require('../../database/models/employee');

/**
 * @method - PATCH
 * @url - '/api/admin/changeemployeremail'
 * @data - auth token
 * @action - change email
 * @access - private
 */
router.patch(
  '/changeemployeremail',
  [
    auth,
    [
      check('oldEmail', 'Old Email is required')
        .not()
        .isEmpty(),
      check('oldEmail', 'Please include a valid email').isEmail(),
      check('newEmail', 'New Email is required')
        .not()
        .isEmpty(),
      check('newEmail', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldEmail, newEmail } = req.body;

    try {
      const admin = await Admin.findOne({ owner: req.user._id });

      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin does not exists' }] });
      }

      const user = await User.findOne({ email: oldEmail });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.email = newEmail;
      await user.save();

      const allEmployers = await Employer.find().populate('owner', ['email']);

      res.json({ allEmployers });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - PATCH
 * @url - '/api/admin/changeemployeeemail'
 * @data - auth token
 * @action - change email
 * @access - private
 */
router.patch(
  '/changeemployeeemail',
  [
    auth,
    [
      check('oldEmail', 'Old Email is required')
        .not()
        .isEmpty(),
      check('oldEmail', 'Please include a valid email').isEmail(),
      check('newEmail', 'New Email is required')
        .not()
        .isEmpty(),
      check('newEmail', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldEmail, newEmail } = req.body;

    try {
      const admin = await Admin.findOne({ owner: req.user._id });

      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin does not exists' }] });
      }

      const user = await User.findOne({ email: oldEmail });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      user.email = newEmail;
      await user.save();

      const allEmployees = await Employee.find().populate('owner', ['email']);

      res.json({ allEmployees });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
