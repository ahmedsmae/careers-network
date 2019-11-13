const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sharp = require("sharp");

const auth = require("../utils/auth");
const upload = require("../utils/upload");

const Employee = require("../../database/models/employee");

/**
 * @method - POST
 * @url - '/api/employees/avatars'
 * @data - {file}
 * @action - change user avatar
 * @access - private
 */
router.post(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employee does not exists" }] });
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();

    employee.avatar = buffer;

    await employee.save();

    res.json({ employee });
  },
  (error, req, res, next) => {
    // express will read this post function as a handler to any error
    res.status(400).send({ error: error.message });
  }
);

/**
 * @method - POST
 * @url - '/api/employees/info'
 * @data - { first_name, middle_name, last_name, gender, birth_date, nationality, religion, marital_status, number_of_dependents,
              residence_country, visa_type, location_id, contact_number, driving_licenses, has_a_car, bio }
 * @action - add/edit employee data
 * @access - private
 */
router.post(
  "/info",
  [
    auth,
    [
      check("first_name", "First name is required")
        .not()
        .isEmpty(),
      check("last_name", "Last name is required")
        .not()
        .isEmpty(),
      check("contact_number", "Contact number is required")
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
      first_name,
      middle_name,
      last_name,
      gender,
      birth_date,
      nationality,
      religion,
      marital_status,
      number_of_dependents,
      residence_country,
      visa_type,
      location_id,
      contact_number,
      driving_licenses,
      has_a_car,
      bio
    } = req.body;

    try {
      const employee = await Employee.findOne({ owner: req.user._id });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee does not exists" }] });
      }

      if (first_name) employee.first_name = first_name;
      if (middle_name) employee.middle_name = middle_name;
      if (last_name) employee.last_name = last_name;
      if (gender) employee.gender = gender;
      if (birth_date) employee.birth_date = birth_date;
      if (nationality) employee.nationality = nationality;
      if (religion) employee.religion = religion;
      if (marital_status) employee.marital_status = marital_status;
      if (number_of_dependents)
        employee.number_of_dependents = number_of_dependents;
      if (residence_country) employee.residence_country = residence_country;
      if (visa_type) employee.visa_type = visa_type;
      if (location_id) employee.location_id = location_id;
      if (contact_number) employee.contact_number = contact_number;
      if (driving_licenses) employee.driving_licenses = driving_licenses;
      if (has_a_car) employee.has_a_car = has_a_car;
      if (bio) employee.bio = bio;

      await employee.save();

      res.json({ employee });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
