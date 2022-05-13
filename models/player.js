const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  _id: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  points: {
    type: String,
    // required: true,
  },
  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("player", PlayerSchema);
