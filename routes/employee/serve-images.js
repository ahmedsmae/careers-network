const express = require('express');
const router = express.Router();

const Employee = require('../../database/models/employee');

/**
 * @method - GET
 * @url - '/api/employees/avatars/:employeeid'
 * @data - No data
 * @action - serving employee avatar
 * @access - public
 */
router.get('/avatars/:employeeid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeid);

    if (!employee) {
      throw new Error('No employee available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(employee.avatar);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/employees/educations/:employeeid/:educationid'
 * @data - No data
 * @action - serving employee avatar
 * @access - public
 */
router.get('/educations/:employeeid/:educationid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeid);

    if (!employee) {
      throw new Error('No employee available');
    }

    const education = employee.educations.find(
      edu => edu._id == req.params.educationid
    );

    if (!education) {
      throw new Error('No education available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(education.certificate_image);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
