const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnemySchema = new Schema({
  _id: {
    type: String,
    // required: true,
  },
  power: {
    type: String,
    // required: true,
  },
  speed: {
    type: String,
    // required: true,
  },
  weapon: {
    type: String,
    // required: true,
  },
  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("enemy", EnemySchema);
