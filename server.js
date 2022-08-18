// app starts from this file 
// creates a server on port 3000
const io = require('socket.io')(3000)

// save users - to uniquely identify users we are using the socket id 
// key - socket id, value userName 
const users = {}


// every time the website loads this function will be triggered 
// each user will be given a socket 
io.on('connection', socket => {
  // user name of who joined the chat 
  socket.on('new-user', userName => {
    users[socket.id] = userName;
    // show other users who connected 
    socket.broadcast.emit('user-connect', userName);
  });


  // display message when a user disconnects
  socket.on('disconnect', () => {
    // show who disconnected 
    socket.broadcast.emit('user-disconnect', users[socket.id]);
    // delete the user from the users obj
    delete users[socket.id];
  });

  // message passed from the client 
  socket.on('send-chat-message', message => {
      // pass the message to every user who has connected to the server
      // and the user who sent it
      socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
  });
});