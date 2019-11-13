const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../utils/auth");
const Employee = require("../../database/models/employee");

/**
 * @method - POST
 * @url - '/api/employees/interests'
 * @data - { interest, award }
 * @action - add new interest to employee
 * @access - private
 */
router.post(
  "/interests",
  [
    auth,
    [
      check("interest", "Interest is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { interest, award } = req.body;

    try {
      const employee = await Employee.findOne({ owner: req.user._id });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee does not exists" }] });
      }

      employee.interests = employee.interests.concat({ interest, award });

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
 * @url - '/api/employees/interests/:interestid'
 * @data - no data
 * @action - delete interest from employee
 * @access - private
 */
router.delete("/interests/:interestid", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employee does not exists" }] });
    }

    employee.interests = employee.interests.filter(
      ({ _id }) => req.params.interestid != _id
    );

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
