const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../utils/auth');
const Employer = require('../../database/models/employer');
const Job = require('../../database/models/job');

/**
 * @method - POST
 * @url - '/api/jobs/'
 * @data - { position, location_id, referance_number, status, applying_email, applying_link,
  responsibilities, requirements, salary_range, currency, other_info, keywords, expiry, questions }
 * @action - add new job
 * @access - private
 */
router.post(
  '/',
  [
    auth,
    [
      check('position', 'Position is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const employer = await Employer.findOne({ owner: req.user._id });

      if (!employer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employer does not exists' }] });
      }

      const job = new Job({ ...req.body, owner: employer._id });

      await job.save();

      const employerJobs = await Job.find({ owner: employer._id });

      res.json({ employerJobs });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - PATCH
 * @url - '/api/jobs/'
 * @data - { _id, owner, position, location_id, referance_number, status, applying_email, applying_link,
  responsibilities, requirements, min_salary, max_salary, currency, other_info, keywords, expiry, questions }
 * @action - update existing job
 * @access - private
 */
router.patch(
  '/',
  [
    auth,
    [
      check('position', 'Position is required')
        .not()
        .isEmpty(),
      check('applying_email', 'Applying Email is required')
        .not()
        .isEmpty(),
      check('responsibilities', 'Responsibilities is required')
        .not()
        .isEmpty(),
      check('requirements', 'Requirements is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      _id,
      owner,
      position,
      location_id,
      referance_number,
      status,
      applying_email,
      applying_link,
      responsibilities,
      requirements,
      min_salary,
      max_salary,
      currency,
      other_info,
      keywords,
      expiry,
      questions
    } = req.body;

    try {
      const employer = await Employer.findOne({ owner: req.user._id });

      if (!employer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employer does not exists' }] });
      }

      if (owner != employer._id) {
        return res.status(400).json({
          errors: [{ msg: 'This job does not belong to this employer' }]
        });
      }

      const job = await Job.findById(_id);

      if (!job) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Job does not exists' }] });
      }

      if (position) job.position = position;
      if (location_id) job.location_id = location_id;
      if (referance_number) job.referance_number = referance_number;
      if (status) job.status = status;
      if (applying_email) job.applying_email = applying_email;
      if (applying_link) job.applying_link = applying_link;
      if (responsibilities) job.responsibilities = responsibilities;
      if (requirements) job.requirements = requirements;
      if (min_salary) job.min_salary = min_salary;
      if (max_salary) job.max_salary = max_salary;
      if (currency) job.currency = currency;
      if (other_info) job.other_info = other_info;
      if (keywords) job.keywords = keywords;
      if (expiry) job.expiry = expiry;
      if (questions) job.questions = questions;

      await job.save();

      const employerJobs = await Job.find({ owner: employer._id });

      res.json({ employerJobs });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
