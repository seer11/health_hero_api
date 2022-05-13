const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// const auth = require("../../middleware/auth");

const User = require("../../models/player");
const { uuid } = require("../../utils/convertHelpers");
// const User = require("../../models/User");
// const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/users
// @desc     Create a new user
// @access   Public for now
router.post(
  "/",
  check("name", "Name is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("password", "Password is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    console.log("errors=>", errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = new User({
        _id: uuid(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        points: req.body.points,
      });

      const user = await newUser.save();

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/users
// @desc     Get all users
// @access   Public for now
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
