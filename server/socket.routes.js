const { Server } = require('socket.io');

const socketMap = {};

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));

    socket.on('join-game', (gameCode) => {
      if (socketMap[socket.id]) {
        console.log(`Socket ${socket.id} leaving bingo game: ${socketMap[socket.id]}`);
        socket.leave(socketMap[socket.id]);
      }

      console.log(`Socket ${socket.id} joining bingo game: ${gameCode}`);
      socketMap[socket.id] = gameCode;
      socket.join(gameCode);
    });
  });
  return io;
};
