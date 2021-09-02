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
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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

app.post('/call-next-number', async (req, res) => {
  const characters = 'BINGO';

  const letter = characters.charAt(Math.floor(Math.random()
      * characters.length));
  const number = Math.floor(Math.random() * 99) + 1;
  res.json({ nextNumber: `${letter} ${number}` });
});

app.get('/jobs', async (req, res) => {
  try {
    const jobs = [
      {
        id: 1,
        type: 'Awesome',
        created_at: new Date(),
        company: 'Mind Canary',
        location: 'Montana',
        title: 'Extra Most Bestest',
        company_logo: 'https://dogtime.com/assets/uploads/2016/08/corgi-puppy-6-e1573588370274.jpg',
        index: 99,
      },
    ];
    res.send(jobs);
  } catch (error) {
    res.status(400).send('Error while getting list of jobs.Try again later.');
  }
});

// Madness required for client side react router
app.get('/*', (req, res) => {
  console.log('No route found, attempting to return index.html');
  let url = path.join(__dirname, '../build', 'index.html');
  console.log(`URL:${url}`);
  if (!url.startsWith('/app/')) // we're on local windows
  { url = url.substring(1); }
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
app.post('/message', (request, response) => {
  const { message } = request.body;
  io.emit('chat message', message);
  response.send(`message emitted:${message}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});
