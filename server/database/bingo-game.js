const mongoose = require('mongoose');

const { Schema } = mongoose;

const BingoGame = new Schema({
  code: String,
  numbers: [{ type: String }],
});

module.exports = mongoose.model('BingoGame', BingoGame);
