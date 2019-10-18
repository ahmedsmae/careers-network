const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employer = require('../../database/models/employer');
const Job = require('../../database/models/job');

/**
 * @method - DELETE
 * @url - '/api/jobs/:jobid'
 * @data - auth token
 * @action - delete job
 * @access - private
 */
router.delete('/:jobid', auth, async (req, res) => {
  try {
    const employer = await Employer.find({ owner: req.user._id });

    if (!employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer does not exists' }] });
    }

    const job = await Job.findById(req.params.jobid);

    if (!job) {
      return res.status(400).json({ errors: [{ msg: 'Job does not exists' }] });
    }

    if (employer._id.toString() !== job.owner.toString()) {
      return res.status(400).json({
        errors: [{ msg: 'This job does not belong to this employer' }]
      });
    }

    await job.remove();

    const employerJobs = await Job.find({ owner: employer._id });

    res.json({ employerJobs });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
