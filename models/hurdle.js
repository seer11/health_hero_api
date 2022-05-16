const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HurdleSchema = new Schema({
  _id: {
    type: String,
    // required: true,
  },
  position: {
    type: String,
    // required: true,
  },

  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("hurdle", HurdleSchema);
