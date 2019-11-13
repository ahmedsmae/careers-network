const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../utils/auth");
const Employee = require("../../database/models/employee");

/**
 * @method - POST
 * @url - '/api/employees/skills'
 * @data - { skill, level }
 * @action - add new skill to employee
 * @access - private
 */
router.post(
  "/skills",
  [
    auth,
    [
      check("skill", "Skill is required")
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

    const { skill, level } = req.body;

    try {
      const employee = await Employee.findOne({ owner: req.user._id });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee does not exists" }] });
      }

      employee.skills = employee.skills.concat({ skill, level });

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
 * @url - '/api/employees/skills/:skillid'
 * @data - no data
 * @action - delete skill from employee
 * @access - private
 */
router.delete("/skills/:skillid", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employee does not exists" }] });
    }

    employee.skills = employee.skills.filter(
      ({ _id }) => req.params.skillid != _id
    );

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
