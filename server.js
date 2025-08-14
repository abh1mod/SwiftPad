const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
// const qrcode = require('qrcode-terminal');
const ip = require('ip');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let user_array = [];

app.use(express.static('public'));

io.on('connection', (socket) => { 
  console.log('A user connected');
  user_array.push(socket.id);
  console.log(`Connected users: ${user_array}`);
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', { ...data, from: socket.id });  //including sender id so that drawing events
   });                                                              //  doesn't come back to sender itself



  // get disconnected user
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    user_array = user_array.filter(id => id !== socket.id);
    console.log(`Connected users: ${user_array}`);
  });
});

const localIP = ip.address();
const url = `http://${localIP}:3000`;
console.log(`Server running at ${url}`);
// qrcode.generate(url, { small: true });

server.listen(3000);
