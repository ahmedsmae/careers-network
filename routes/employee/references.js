const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../utils/auth");
const Employee = require("../../database/models/employee");

/**
 * @method - POST
 * @url - '/api/employees/references'
 * @data - { _id, name, position, company, email, contact_number }
 * @action - add/edit reference to employee
 * @access - private
 */
router.post(
  "/references",
  [
    auth,
    [
      check("name", "Reference name is required")
        .not()
        .isEmpty(),
      check("email", "Reference email is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id, name, position, company, email, contact_number } = req.body;

    try {
      const employee = await Employee.findOne({ owner: req.user._id });

      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee does not exists" }] });
      }

      let reference = employee.references.find(ref => ref._id == _id);

      if (reference) {
        // Edit
        employee.references.map(ref =>
          ref._id == _id
            ? { ...ref, name, position, company, email, contact_number }
            : ref
        );
      } else {
        // Add
        employee.references = employee.references.concat({
          name,
          position,
          company,
          email,
          contact_number
        });
      }

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
 * @url - '/api/employees/references/:referenceid'
 * @data - no data
 * @action - delete reference from employee
 * @access - private
 */
router.delete("/references/:referenceid", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ owner: req.user._id });

    if (!employee) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employee does not exists" }] });
    }

    employee.references = employee.references.filter(
      ({ _id }) => req.params.referenceid != _id
    );

    await employee.save();

    res.json({ employee });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
