const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
var ObjectID = require('mongodb').ObjectID;
const sharp = require('sharp');

const auth = require('../utils/auth');
const upload = require('../utils/upload');

const Employee = require('../../database/models/employee');

/**
 * @method - POST
 * @url - '/api/employees/educations'
 * @data - { _id, subject, institute, location_id, description, from, current, to }
 * @action - add/edit education to employee
 * @access - private
 */
router.post(
  '/educations',
  [
    auth,
    [
      check('subject', 'Subject is required')
        .not()
        .isEmpty(),
      check('institute', 'Institute is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id } = req.body;

    try {
      const employee = await Employee.findOne({ owner: req.user._id });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employee does not exists' }] });
      }

      let educationId;
      let employeeEducations = employee.toObject().educations;

      if (_id) {
        // edit education
        educationId = _id;
        employeeEducations = employeeEducations.map(edu =>
          edu._id == _id ? { ...edu, ...req.body } : edu
        );
      } else {
        // add education
        educationId = new ObjectID();
        employeeEducations = employeeEducations.concat({
          ...req.body,
          _id: educationId
        });
      }

      employee.educations = employeeEducations;
      await employee.save();

      res.json({ employee, educationId });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - '/api/employees/eduactions/setimage/:educationid'
 * @data - {file}
 * @action - change user avatar
 * @access - private
 */
router.post(
  '/eduactions/setimage/:educationid',
  auth,
  upload.single('certificate'),
  async (req, res) => {
    try {
      const employee = await Employee.findOne({ owner: req.user._id });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employee does not exists' }] });
      }

      const buffer = await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .png()
        .toBuffer();

      let educationId;
      let employeeEducations = employee.toObject().educations;

      if (req.params.educationid) {
        // edit education certificate image
        educationId = req.params.educationid;
        employeeEducations = employeeEducations.map(edu =>
          edu._id == req.params.educationid
            ? { ...edu, certificate_image: buffer }
            : edu
        );
      } else {
        // add education
        educationId = new ObjectID();
        employeeEducations = employeeEducations.concat({
          certificate_image: buffer,
          _id: educationId
        });
      }

      employee.educations = employeeEducations;

      await employee.save();

      res.json({ employee, educationId });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - DELETE
 * @url - '/api/employees/educations/:educationid'
 * @data - no data
 * @action - delete education from employee
 * @access - private
 */
router.delete('/educations/:educationid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    let educations = employee.toObject().educations;
    educations = educations.filter(edu => edu._id != req.params.educationid);

    employee.educations = educations;

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
