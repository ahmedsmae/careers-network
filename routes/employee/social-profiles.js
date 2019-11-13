const express = require("express");
const router = express.Router();

const auth = require("../utils/auth");
const Employee = require("../../database/models/employee");

/**
 * @method - POST
 * @url - '/api/employees/socialprofiles'
 * @data - { website, linkedin, twitter, github, stackoverflow, facebook, instagram, youtube }
 * @action - add/edit reference to employee
 * @access - private
 */
router.post("/socialprofiles", auth, async (req, res) => {
  const {
    website,
    linkedin,
    twitter,
    github,
    stackoverflow,
    facebook,
    instagram,
    youtube
  } = req.body;

  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employee does not exists" }] });
    }

    const socialProfiles = {};

    if (website) socialProfiles.website = website;
    if (linkedin) socialProfiles.linkedin = linkedin;
    if (twitter) socialProfiles.twitter = twitter;
    if (github) socialProfiles.github = github;
    if (stackoverflow) socialProfiles.stackoverflow = stackoverflow;
    if (facebook) socialProfiles.facebook = facebook;
    if (instagram) socialProfiles.instagram = instagram;
    if (youtube) socialProfiles.youtube = youtube;

    employee.social_profiles = socialProfiles;

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
