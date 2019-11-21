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
 * @url - '/api/employees/experiences'
 * @data - { _id, position, organization, location_id, description, salary, currency, from, current, to }
 * @action - add/edit experience to employee
 * @access - private
 */
router.post(
  '/experiences',
  [
    auth,
    [
      check('position', 'Position is required')
        .not()
        .isEmpty(),
      check('organization', 'Organization is required')
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

      let experienceId;
      let employeeExperiences = employee.toObject().experiences;

      if (_id) {
        // edit experience
        experienceId = _id;
        employeeExperiences = employeeExperiences.map(exp =>
          exp._id == _id ? { ...exp, ...req.body } : exp
        );
      } else {
        // add experience
        experienceId = new ObjectID();
        employeeExperiences = employeeExperiences.concat({
          ...req.body,
          _id: experienceId
        });
      }

      employee.experiences = employeeExperiences;
      await employee.save();

      res.json({ employee, experienceId });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - POST
 * @url - '/api/employees/experiences/setimage/:experienceid'
 * @data - {file}
 * @action - change experience certificate inage
 * @access - private
 */
router.post(
  '/experiences/setimage/:experienceid',
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

      let experienceId;
      let employeeExperiences = employee.toObject().experiences;

      if (req.params.experienceid) {
        // edit experience certificate image
        experienceId = req.params.experienceid;
        employeeExperiences = employeeExperiences.map(exp =>
          exp._id == req.params.experienceid
            ? { ...exp, certificate_image: buffer }
            : exp
        );
      } else {
        // add experience
        experienceId = new ObjectID();
        employeeExperiences = employeeExperiences.concat({
          certificate_image: buffer,
          _id: experienceId
        });
      }

      employee.experiences = employeeExperiences;

      await employee.save();

      res.json({ employee, experienceId });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - DELETE
 * @url - '/api/employees/experiences/:experienceid'
 * @data - no data
 * @action - delete experience from employee
 * @access - private
 */
router.delete('/experiences/:experienceid', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employee does not exists' }] });
    }

    let experiences = employee.toObject().experiences;
    experiences = experiences.filter(exp => exp._id != req.params.experienceid);

    employee.experiences = experiences;

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
