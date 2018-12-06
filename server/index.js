const express = require('express');
const path = require('path');
const axios = require('axios');
const youtube = require('./api/youtube.js');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = require('socket.io-client')();

app.use(express.json());

const port = 80;

app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/search', (req, res) => {
  const { query } = req.body;
  if (query !== '') {
    youtube.search(query, (err, response) => {
      if (err) { res.send(err.response) }
      else {
        res.send(response.data.items);
      }
    });
  }
});

const users = [];

io.on('connection', (socket) => {
  socket.on('change_username', (data) => {
    socket.userId = Math.random().toString(16).substring(2, 15);
    socket.username = data.username;
    users.push({
      name: socket.username,
      id: socket.userId,
    });
    io.sockets.emit('new_message', {
      message: `${socket.username} entered the room!`, 
    });
    io.sockets.emit('clients_connected', users);
  });

  socket.on('change_video', (video) => {
    io.sockets.emit('new_message', {
      message: `${socket.username} shared ${video.snippet.title}!`,
    });
    io.sockets.emit('change_video', video);
  })

  socket.on('send_coords', (data) => {
    const userIndex = users.map(user => user.id).indexOf(socket.userId);
    users[userIndex].coords = data; 
    io.sockets.emit('clients_connected', users);
  });

  socket.on('new_message', (message) => {
    io.sockets.emit('new_message', {
      message: message, 
      username: socket.username,
    })
  });

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.userId), 1);
    io.sockets.emit('new_message', {
      message: `${socket.username} left the room`,
    });
    io.sockets.emit('clients_connected', users);
  });
})

http.listen(port, () => {
  'server initiated at: ' + port;
});
