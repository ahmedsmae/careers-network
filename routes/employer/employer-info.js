const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const sharp = require('sharp');

const auth = require('../utils/auth');
const upload = require('../utils/upload');

const Employer = require('../../database/models/employer');

/**
 * @method - POST
 * @url - '/api/employers/avatars'
 * @data - {file}
 * @action - change employer avatar
 * @access - private
 */
router.post(
  '/avatars',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const employer = await Employer.findOne({ owner: req.user._id });

    if (!employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer does not exists' }] });
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();

    employer.avatar = buffer;

    await employer.save();

    res.json({ employer });
  },
  (error, req, res, next) => {
    // express will read this post function as a handler to any error
    res.status(400).send({ error: error.message });
  }
);

/**
 * @method - POST
 * @url - '/api/employers/covers'
 * @data - {file}
 * @action - change employer cover image
 * @access - private
 */
router.post(
  '/covers',
  auth,
  upload.single('cover'),
  async (req, res) => {
    const employer = await Employer.findOne({ owner: req.user._id });

    if (!employer) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Employer does not exists' }] });
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 400, height: 400 })
      .png()
      .toBuffer();

    employer.cover = buffer;

    await employer.save();

    res.json({ employer });
  },
  (error, req, res, next) => {
    // express will read this post function as a handler to any error
    res.status(400).send({ error: error.message });
  }
);

/**
 * @method - POST
 * @url - '/api/employers/info'
 * @data - { name, speciality, kind, contact_numbers, location_id, web_site, bio }
 * @action - add/edit employee data
 * @access - private
 */
router.post(
  '/info',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('kind', 'Kind is required')
        .not()
        .isEmpty(),
      check('contact_numbers', 'Contact numbers is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      speciality,
      kind,
      contact_numbers,
      location_id,
      web_site,
      bio
    } = req.body;

    try {
      const employer = await Employer.findOne({ owner: req.user._id });

      if (!employer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employer does not exists' }] });
      }

      if (name) employer.name = name;
      if (speciality) employer.speciality = speciality;
      if (kind) employer.kind = kind;
      if (contact_numbers) employer.contact_numbers = contact_numbers;
      if (location_id) employer.location_id = location_id;
      if (web_site) employer.web_site = web_site;
      if (bio) employer.bio = bio;

      await employer.save();

      res.json({ employer });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
