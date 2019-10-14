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

    const employerJobs = await Job.find({ owner: employer._id });

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
    let searchCriteria = {};
    if (locationid && locationid.length > 0 && locationid !== 'null') {
      searchCriteria.location_id = locationid;
    }
    if (position && position.length > 0) {
      searchCriteria.position = { $regex: position.trim(), $options: 'i' };
    }

    const jobsResult = await Job.find(searchCriteria);

    res.json({ jobsResult });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/jobs/following/:employeeid'
 * @data - Header token
 * @action - get all the jobs of employers followed by this employee
 * @access - private
 */
router.get('/following/:employeeid', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeid);

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    //!  use employeeid > get list of following
    //! use following > get list of jobs {owner===following.employer_id}
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
