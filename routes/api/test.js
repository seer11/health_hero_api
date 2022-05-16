const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// const auth = require("../../middleware/auth");

const Test = require("../../models/test");
const { uuid } = require("../../utils/convertHelpers");
// const User = require("../../models/User");
// const checkObjectId = require("../../middleware/checkObjectId");

// @route    GET api/test
// @desc     Get all test
// @access   Public for now
router.get("/", async (req, res) => {
  console.log("req here ===>", req.query);
  res.json(req.query);
  //   try {
  //     const posts = await Test.find().sort({ date: -1 });
  //     res.json(posts);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send("Server Error");
  //   }
});

module.exports = router;
