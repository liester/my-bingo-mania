const currentGames = [];

module.exports = (app, io) => {
  app.post('/create-game', async (req, res) => {
    let gameCode = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      gameCode += characters.charAt(Math.floor(Math.random()
          * charactersLength));
    }
    currentGames.push(gameCode);
    console.log(`Current Games: ${currentGames}`);
    res.json({ gameCode });
  });

  app.get('/current-games', (req, res) => {
    res.json(currentGames);
  });

  app.post('/call-next-number', async (req, res) => {
    const { gameCode } = req.body;
    if (!gameCode) {
      return;
    }
    const characters = 'BINGO';
    const characterIndex = Math.floor(Math.random()
        * characters.length);
    const letter = characters.charAt(characterIndex);
    const number = (Math.floor(Math.random() * 15) + 1) * (characterIndex + 1);
    io.to(gameCode).emit('next number', `${letter} ${number}`);
    res.json({ nextNumber: `${letter} ${number}` });
  });
};
