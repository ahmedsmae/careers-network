const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employer = require('../../database/models/employer');
const Employee = require('../../database/models/employee');
// const Following = require('../../database/models/following')
const Job = require('../../database/models/job');

/**
 * @method - GET
 * @url - '/api/jobs/employerjobs/:employerid'
 * @data - no data
 * @action - get employer jobs
 * @access - public
 */
router.get('/employerjobs/:employerid', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.employerid);

    if (!employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer does not exists' }] });
    }

    const employerJobs = await Job.find({ owner: employer._id }).populate(
      'owner'
    );

    res.json({ employerJobs });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/jobs/search/:position/:locationid'
 * @data - { position, location_id }
 * @action - search by position and locationId
 * @access - public
 */
router.get('/search/:position/:locationid', async (req, res) => {
  const { position, locationid } = req.params;

  try {
    const locationQ = {};
    if (locationid && locationid !== 'null' && locationid.length > 0) {
      locationQ.location_id = locationid;
    }

    const jobsResult = await Job.find(
      { $text: { $search: position }, ...locationQ },
      { score: { $meta: 'textScore' } }
    ).populate('owner');

    res.json({ jobsResult });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/jobs/homejobs'
 * @data - token
 * @action - get employee home jobs
 * @access - private
 */
router.get('/homejobs', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    const { keywords, location_ids } = employee.prefered_jobs_settings;

    const locationQ = {};
    if (location_ids.length > 0) {
      locationQ.location_id = location_ids;
    }

    const homeJobs = await Job.find(
      { $text: { $search: keywords.join(',') }, ...locationQ },
      { score: { $meta: 'textScore' } }
    ).populate('owner');

    res.json({ homeJobs });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
