const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// const auth = require("../../middleware/auth");

const { uuid } = require("../../utils/convertHelpers");

const battleCharacter = require("../../models/battleCharacter");
// const User = require("../../models/User");
// const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/battleCharacter
// @desc     Create a new battleCharacter
// @access   Public for now
router.post(
  "/",
  check("power", "power is required").notEmpty(),
  check("attack", "attack is required").notEmpty(),
  check("defense", "defense is required").notEmpty(),
  check("life", "life is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newData = new battleCharacter({
        _id: uuid(),
        chracter_id: uuid(),
        power: req.body.power,
        attack: req.body.attack,
        defense: req.body.defense,
        life: req.body.life,
      });

      // const data = await newData.save();

      res.json(newData);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/battleCharacter
// @desc     Get all battleCharacter
// @access   Public for now
router.get("/", async (req, res) => {
  console.log("req.method=>", req.baseUrl);
  // console.log("req=>", req);
  try {
    const battleCharacters = await battleCharacter.find().sort({ date: -1 });
    res.json(battleCharacters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
