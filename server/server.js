const path = require('path');
const cors = require('cors');
const express = require('express');

const app = express();

const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

const currentGames = [];

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());
app.use(express.json());

app.post('/create-game', async (req, res) => {
  let gameCode = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    gameCode += characters.charAt(Math.floor(Math.random()
                * charactersLength));
  }
  currentGames.push(gameCode);
  res.json({ gameCode });
});

app.post('/join-game', async (req, res) => {
  res.json({ success: true });
});

app.get('/current-games', (req, res) => {
  res.json(currentGames);
});

// Madness required for client side react router
app.get('/*', (req, res) => {
  console.log('No route found, attempting to return index.html');
  let url = path.join(__dirname, '../build', 'index.html');
  console.log(`URL:${url}`);
  if (!url.startsWith('/app/')) { // we're on local windows
    url = url.substring(1);
  }
  res.sendFile(url);
});

const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.post('/call-next-number', async (req, res) => {
  const characters = 'BINGO';
  const characterIndex = Math.floor(Math.random()
      * characters.length);
  const letter = characters.charAt(characterIndex);
  const number = (Math.floor(Math.random() * 15) + 1) * (characterIndex + 1);
  io.emit('next number', `${letter} ${number}`);
  res.json({ nextNumber: `${letter} ${number}` });
});
