const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../database/models/user');
const Employee = require('../../database/models/employee');

/**
 * @method - POST
 * @url - '/api/users/signup'
 * @data - {email, password}
 * @action - signup a new user
 * @access - public
 */
router.post(
  '/signup',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 7 or more characters'
    ).isLength({ min: 7 }),
    check('password', 'password cannot contains the word "password"')
      .isLowercase()
      .not()
      .contains('password')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, kind } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      user = new User({ email, password, kind });

      // hashing the password will be done automatically in the User model before save()
      await user.save();

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - '/api/users/signin'
 * @data - {email, password}
 * @action - signin an existing user
 * @access - public
 */
router.post(
  '/signin',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is requires')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exists' }] });
      }

      const token = await user.generateAuthToken();

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - GET
 * @url - '/api/users/auth'
 * @data - token header
 * @action - get current user data
 * @access - private
 */
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User does not exists' }] });
    }

    const userKind = user.kind;

    let employee, employer;
    if (userKind === process.env.KIND_EMPLOYEE) {
      employee = Employee.findOne({ owner: req.user._id });
    } else if (userKind === process.env.KIND_EMPLOYER) {
      // employer = Employer.findOne({ owner: req.user._id });
    }

    res.json({ user, employee, employer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - POST
 * @url - '/api/users/signout'
 * @data - token header
 * @action - signout a user
 * @access - private
 */
router.post('/signout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.json({ msg: 'User logged out from current session' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
