const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../utils/auth");
const Employee = require("../../database/models/employee");

/**
 * @method - POST
 * @url - '/api/employees/languages'
 * @data - { language, level }
 * @action - add new language to employee
 * @access - private
 */
router.post(
  "/languages",
  [
    auth,
    [
      check("language", "Language is required")
        .not()
        .isEmpty(),
      check("level", "Level is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { language, level } = req.body;

    try {
      const employee = await Employee.findOne({ owner: req.user._id });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee does not exists" }] });
      }

      employee.languages = employee.languages.concat({ language, level });

      await employee.save();

      res.json({ employee });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  }
);

/**
 * @method - DELETE
 * @url - '/api/employees/languages/:languageid'
 * @data - no data
 * @action - delete language from employee
 * @access - private
 */
router.delete("/languages/:languageid", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employee does not exists" }] });
    }

    employee.languages = employee.languages.filter(
      ({ _id }) => req.params.languageid != _id
    );

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
