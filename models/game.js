const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  player_id: {
    //required for defining the ownership of the game
    type: String,
    required: true,
  },
  game_type: {
    type: String,
    // required: true,
  },

  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("character", CharacterSchema);
