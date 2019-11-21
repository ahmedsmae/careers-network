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
 * @action - serving education certificate image
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

/**
 * @method - GET
 * @url - '/api/employees/experiences/:employeeid/:experienceid'
 * @data - No data
 * @action - serving experience certificate image
 * @access - public
 */
router.get('/experiences/:employeeid/:experienceid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeid);

    if (!employee) {
      throw new Error('No employee available');
    }

    const experience = employee.experiences.find(
      exp => exp._id == req.params.experienceid
    );

    if (!experience) {
      throw new Error('No experience available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(experience.certificate_image);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/employees/trainings/:employeeid/:trainingid'
 * @data - No data
 * @action - serving experience certificate image
 * @access - public
 */
router.get('/trainings/:employeeid/:trainingid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeid);

    if (!employee) {
      throw new Error('No employee available');
    }

    const training = employee.trainings_certifications.find(
      train => train._id == req.params.trainingid
    );

    if (!training) {
      throw new Error('No training available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(training.certificate_image);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
