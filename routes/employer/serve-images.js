const express = require('express');
const router = express.Router();

const Employer = require('../../database/models/employer');

/**
 * @method - GET
 * @url - '/api/employers/avatars/:employerid'
 * @data - No data
 * @action - serving employer avatar
 * @access - public
 */
router.get('/avatars/:employerid', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.employerid);

    if (!employer) {
      throw new Error('No employer available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(employer.avatar);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

/**
 * @method - GET
 * @url - '/api/employers/covers/:employerid'
 * @data - No data
 * @action - serving employer avatar
 * @access - public
 */
router.get('/covers/:employerid', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.employerid);

    if (!employer) {
      throw new Error('No employer available');
    }

    res.set('Content-Type', 'image/jpg');
    res.send(employer.cover);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
