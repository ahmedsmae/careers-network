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
 * @url - '/api/employees/trainings'
 * @data - { _id, kind, subject, institute, location_id, description, from, current, to }
 * @action - add/edit training to employee
 * @access - private
 */
router.post(
  '/trainings',
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

      let trainingId;
      let employeeTrainings = employee.toObject().trainings_certifications;

      if (_id) {
        // edit training
        trainingId = _id;
        employeeTrainings = employeeTrainings.map(train =>
          train._id == _id ? { ...train, ...req.body } : train
        );
      } else {
        // add training
        trainingId = new ObjectID();
        employeeTrainings = employeeTrainings.concat({
          ...req.body,
          _id: trainingId
        });
      }

      employee.trainings_certifications = employeeTrainings;
      await employee.save();

      res.json({ employee, trainingId });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - '/api/employees/trainings/setimage/:trainingid'
 * @data - {file}
 * @action - change training certificate image
 * @access - private
 */
router.post(
  '/trainings/setimage/:trainingid',
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

      let trainingId;
      let employeeTrainings = employee.toObject().trainings_certifications;

      if (req.params.trainingid) {
        // edit training certificate image
        trainingId = req.params.trainingid;
        employeeTrainings = employeeTrainings.map(train =>
          train._id == req.params.trainingid
            ? { ...train, certificate_image: buffer }
            : train
        );
      } else {
        // add training
        trainingId = new ObjectID();
        employeeTrainings = employeeTrainings.concat({
          certificate_image: buffer,
          _id: trainingId
        });
      }

      employee.trainings_certifications = employeeTrainings;

      await employee.save();

      res.json({ employee, trainingId });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - DELETE
 * @url - '/api/employees/trainings/:trainingid'
 * @data - no data
 * @action - delete training from employee
 * @access - private
 */
router.delete('/trainings/:trainingid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    let trainings = employee.toObject().trainings_certifications;
    trainings = trainings.filter(train => train._id != req.params.trainingid);

    employee.trainings_certifications = trainings;

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
