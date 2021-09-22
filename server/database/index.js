const mongoose = require('mongoose');
const BingoGame = require('./bingo-game');

const database = process.env.MONGO_DB;
const uri = `mongodb://localhost:27018/${database}`;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const newBingoGame = new BingoGame({
  code: 'test',
  numbers: ['N17'],
});

newBingoGame.save();
