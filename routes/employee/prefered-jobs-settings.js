const express = require('express');
const router = express.Router();

const auth = require('../utils/auth');
const Employee = require('../../database/models/employee');

/**
 * @method - POST
 * @url - '/api/employees/preferedjobssettings'
 * @data - { keywords, location_ids }
 * @action - edit prefered jobs settings
 * @access - private
 */
router.post('/preferedjobssettings', auth, async (req, res) => {
  const { keywords, location_ids } = req.body;

  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    if (keywords) employee.prefered_jobs_settings.keywords = keywords;
    if (location_ids)
      employee.prefered_jobs_settings.location_ids = location_ids;

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
