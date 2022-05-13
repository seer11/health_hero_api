const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// const auth = require("../../middleware/auth");

const Nft = require("../../models/nft");
const { uuid } = require("../../utils/convertHelpers");
// const User = require("../../models/User");
// const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/nfts
// @desc     Create a new Nft
// @access   Public for now
router.post(
  "/",
  check("name", "Name is required").notEmpty(),
  async (req, res) => {
    console.log("req.body=>", req.body);
    const errors = validationResult(req);
    console.log("errors=>", errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newNft = new Nft({
        _id: uuid(),
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        attributes: req.body.attributes,
      });

      const nft = await newNft.save();

      res.json(nft);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/nfts
// @desc     Get all nfts
// @access   Public for now
router.get("/", async (req, res) => {
  try {
    const posts = await Nft.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
