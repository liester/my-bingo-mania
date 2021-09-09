const { generateOptionsForGame } = require('./bingo-generator');

const currentGames = {};

module.exports = (app, io) => {
  app.post('/create-game', async (req, res) => {
    let gameCode = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      gameCode += characters.charAt(Math.floor(Math.random()
          * charactersLength));
    }
    currentGames[gameCode] = generateOptionsForGame();
    console.log(`Current Games: ${Object.keys(currentGames)}`);
    res.json({ gameCode });
  });

  app.get('/current-games', (req, res) => {
    res.json(Object.keys(currentGames));
  });

  app.post('/call-next-number', async (req, res) => {
    const { gameCode } = req.body;
    if (!gameCode) {
      return;
    }
    // const characters = 'BINGO';
    // const characterIndex = Math.floor(Math.random()
    //     * characters.length);
    // const letter = characters.charAt(characterIndex);
    // const number = (Math.floor(Math.random() * 15) + 1) * (characterIndex + 1);
    const numberToCall = currentGames[gameCode] && currentGames[gameCode].pop();
    if (!numberToCall) {
      res.status(500).json({ error: `No numbers left for game: ${gameCode} .  Someone should have won by now` });
    }
    io.to(gameCode).emit('next number', numberToCall);
    res.json({ nextNumber: numberToCall });
  });
};
