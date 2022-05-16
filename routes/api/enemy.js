const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// const auth = require("../../middleware/auth");

const Enemy = require("../../models/character");
const { uuid } = require("../../utils/convertHelpers");
// const User = require("../../models/User");
// const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/enemies
// @desc     Create a new enemies
// @access   Public for now
router.post(
  "/",
  check("power", "power is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCharacter = new Enemy({
        _id: uuid(),
        power: req.body.power,
        speed: req.body.speed,
        weapon: req.body.weapon,
      });

      const character = await newCharacter.save();

      res.json(character);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/enemies
// @desc     Get all enemies
// @access   Public for now
router.get("/", async (req, res) => {
  try {
    const characters = await Enemy.find().sort({ date: -1 });
    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
