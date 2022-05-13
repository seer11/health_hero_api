const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// const auth = require("../../middleware/auth");

const Character = require("../../models/character");
const { uuid } = require("../../utils/convertHelpers");
// const User = require("../../models/User");
// const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/characters
// @desc     Create a new characters
// @access   Public for now
router.post(
  "/",
  check("props", "props is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCharacter = new Character({
        _id: uuid(),
        game_id: uuid(),
        player_id: uuid(),
        props: req.body.props,
      });

      const character = await newCharacter.save();

      res.json(character);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/characters
// @desc     Get all characters
// @access   Public for now
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find().sort({ date: -1 });
    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
