const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  test: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },

  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("test", TestSchema);
