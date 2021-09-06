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
      console.log(`Socket ${socket.id} joining ${gameCode}`);
      socketMap[socket.id] = gameCode;
      socket.join(gameCode);
    });

    socket.on('chat', (data) => {
      const { message, room } = data;
      console.log(`msg: ${message}, room: ${room}`);
      io.to(room).emit('chat', message);
    });
  });
  return io;
};
