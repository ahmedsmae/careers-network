const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const auth = require('../utils/auth');
const User = require('../../database/models/user');

/**
 * @method - DELETE
 * @url - '/api/users/deleteuser'
 * @data - { reason, details, email, password }
 * @action - delete a user
 * @access - private
 */
router.delete(
  '/deleteuser',
  [
    auth,
    [
      check('reason', 'Reason is required')
        .not()
        .isEmpty(),
      check('email', 'Email is required')
        .not()
        .isEmpty(),
      check('password', 'Password is requires')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reason, details, email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      if (user._id.toString() !== req.user._id.toString()) {
        return res.status(400).json({
          errors: [{ msg: 'You can not delete someone else account' }]
        });
      }

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
        to: process.env.ADMIN_EMAIL,
        subject: `${process.env.APP_NAME} User has been removed :(`,
        text: `User: ${email}\nReason: ${reason}\nDetails: ${details}`
      });

      await user.remove();
      res.json({ msg: 'User deleted :(' });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

module.exports = router;
