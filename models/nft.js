const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NftSchema = new Schema({
  _id: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  attributes: [
    {
      trait_type: {
        type: String,
        // required: true,
      },
      value: {
        type: String,
        // required: true,
      },
    },
  ],
  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("nft", NftSchema);
