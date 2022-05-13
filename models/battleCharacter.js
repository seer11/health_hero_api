const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BattleCharacterSchema = new Schema({
  _id: {
    type: String,
    // required: true,
  },
  character_id: {
    type: String,
    // required: true,
  },
  power: {
    type: String,
    // required: true,
  },
  attack: {
    type: String,
    // required: true,
  },
  defense: {
    type: String,
    // required: true,
  },
  life: {
    type: String,
    // required: true,
  },
  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("battleCharacter", BattleCharacterSchema);
