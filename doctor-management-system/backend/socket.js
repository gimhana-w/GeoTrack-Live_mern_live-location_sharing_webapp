const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('New client connected');
        
        // Receive location from doctor
        socket.on('doctorLocationUpdate', (data) => {
            io.emit('doctorLocation', data);  // Broadcast location to all clients
          });
      

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}