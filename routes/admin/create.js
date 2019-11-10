const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const passwordGenerator = require('generate-password');

const auth = require('../utils/auth');
const User = require('../../database/models/user');
const Admin = require('../../database/models/admin');
const Employer = require('../../database/models/employer');

/**
 * @method - POST
 * @url - '/api/admin/createemployer'
 * @data - auth token
 * @action - change email
 * @access - private
 */
router.patch(
  '/createemployer',
  [
    auth,
    [
      check('email', 'Email is required')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const admin = await Admin.findOne({ owner: req.user._id });

      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin does not exists' }] });
      }

      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({
            errors: [{ msg: 'Email has been taken already. try another one' }]
          });
      }

      const password = passwordGenerator.generate({
        length: 10,
        numbers: true,
        uppercase: true
      });

      user = new User({
        email,
        password,
        kind: process.env.KIND_EMPLOYER
      });
      await user.save();

      let transporter = nodemailer.createTransport({
        host: process.env.MAILING_ADDRESS_HOST,
        port: 465,
        service: process.env.MAILING_ADDRESS_SERVICE,
        secure: false,
        auth: {
          user: process.env.MAILING_ADDRESS,
          pass: process.env.MAILING_ADDRESS_PASSWORD
        }
      });

      let info = await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.MAILING_ADDRESS}>`,
        to: email,
        subject: `Your ${process.env.APP_NAME} password`,
        text: `Your password for ${email} is ${password}`
      });

      const allEmployers = await Employer.find().populate('owner', ['email']);

      res.json({ allEmployers });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
