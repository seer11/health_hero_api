const connectDB = require("../../database/db");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { uuid } = require("../../utils/convertHelpers");

const { getSchemaName, getSchema } = require("../../utils/queryParse");

router.get("/", async (req, res) => {
  const collectionName = req.baseUrl.split("/")[2];

  const schema = getSchemaName(collectionName);

  try {
    const battleCharacters = await schema.find().sort({ date: -1 });
    res.json(battleCharacters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  //   check("power", "power is required").notEmpty(),
  //   check("attack", "attack is required").notEmpty(),
  //   check("defense", "defense is required").notEmpty(),
  //   check("life", "life is required").notEmpty(),
  async (req, res) => {
    console.log("req here ===>", req.baseUrl);
    const collectionName = req.baseUrl.split("/")[2];
    console.log("collectionName ===>", collectionName);

    const schema = getSchema(collectionName);

    //Adding validation for schema structure
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newData = new schema({
        _id: uuid(),
        test: req.body.test,
        name: req.body.name,
      });

      console.log("req.body==>", req.body);

      //   const data = await newData.save();

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

  // validation for schema exists in the SCHEMA_DATA folder

  // validation for schema data format

  // validation for roles/access

  try {
    const battleCharacters = await battleCharacter.find().sort({ date: -1 });
    res.json(battleCharacters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
