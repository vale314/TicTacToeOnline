const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const idToName = require('./utils/idToName');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/message', require('./routes/messages'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));



io.on('connection', function (socket) {
  // console.log("Conectado ", socket.id)

  // console.log(io.sockets.sockets[socket.id].id)

  socket.on('msg', (data) => {
    idToName(data.token, (name) => {
      io.sockets.emit('msg', {
        user: name,
        body: data.text
      });
    })
  })


  socket.on('active', (data) => {
    var users = []
    idToName(data.token, (name) => {

      socket.nickname = name;
      
      io.clients((error, clients) => {
        if (error) throw error;
        clients.map((client)=>{
          if(io.sockets.sockets[client].nickname !== undefined){
            users.push({
              name:io.sockets.sockets[client].nickname,
              id:io.sockets.sockets[client].id
            })          
          }
        });

        io.sockets.emit('active', users);
        console.log(users)
      });
    })
  })

  socket.on('msg-private', (data) => {
    io.sockets.to(`${data.id}`).emit('msg-private', data.text);
  })

});