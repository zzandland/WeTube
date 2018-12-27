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
  const { searchQuery } = req.body;
  if (searchQuery !== '') {
    youtube.search(searchQuery, (err, response) => {
      if (err) { res.send(err.response) }
      else {
        res.send(response.data.items);
      }
    });
  }
});

const users = [];

io.on('connection', (socket) => {
  socket.on('NEW_USER', (data) => {
    if (!socket.userId) {
      socket.userId = socket.id;
    } else {
      const userIndex = users.map(user => user.userId).indexOf(socket.userId);
      users.splice(userIndex, 1);
    }
    if (data.username === 'Anonymous') {
      socket.username = `Anonymous#${socket.userId.slice(0, 5)}`; 
    } else {
      socket.username = data.username;
    }
    users.push({
      name: socket.username,
      userId: socket.userId,
    });
    socket.emit('UPDATE_SELF', {
      name: socket.username,
      userId: socket.userId,
      coords: socket.coords,
    }) 
    io.sockets.emit('UPDATE_MESSAGES', {
      message: `${socket.username} entered the room!`, 
    });
    io.sockets.emit('UPDATE_USERS', users);
  });

  socket.on('SHARE_VIDEO', (video) => {
    io.sockets.emit('UPDATE_MESSAGES', {
      message: `${socket.username} shared ${video.snippet.title}!`,
    });
    io.sockets.emit('NEW_VIDEO', video);
  })

  socket.on('SEND_COORDS', (data) => {
    socket.coords = data;
    const userIndex = users.map(user => user.userId).indexOf(socket.userId);
    users[userIndex].coords = data; 
    io.sockets.emit('UPDATE_USERS', users);
  });

  socket.on('NEW_MESSAGE', (message) => {
    io.sockets.emit('UPDATE_MESSAGES', {
      message: message, 
      username: socket.username,
    })
  });

  socket.on('GAMEPLAY_REQUEST', (data) => {
    io.to(data.recipient).emit('GAMEPLAY_RECEIVED', data); 
  });

  socket.on('SEND_RESPONSE', (data) => {
    io.to(data.recipient).emit('GAMEPLAY_RESPONSE', data);
  })

  socket.on('disconnect', () => {
    const userIndex = users.map(user => user.userId).indexOf(socket.userId);
    users.splice(userIndex, 1);
    io.sockets.emit('UPDATE_MESSAGES', {
      message: `${socket.username} left the room`,
    });
    io.sockets.emit('UPDATE_USERS', users);
  });
})

http.listen(port, () => {
  'server initiated at: ' + port;
});
