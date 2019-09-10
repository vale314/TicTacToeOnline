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

var users = [];


io.on('connection', function (socket) {
  // console.log("Conectado ", socket.id)
  
  // console.log(io.sockets.sockets[socket.id].id)

  socket.on('msg', (data) => {
    idToName(data.token,(name)=>{
      io.sockets.emit('msg', {
        user: name,
        body: data.text
      });
    })
  })
  
  
  socket.on('active',(data)=>{
    idToName(data.token,(name)=>{
      
      if(users === undefined || users.length == 0){
        users.push({name:name, id:socket.id})
      }

      users.map(user =>
        user.name === name ? {name:name, id:socket.id} : user
      )

      var find = users.find(user =>{
        if(user.name == name)
          return true;
      })

      if(find === undefined){
        users.push({name:name, id:socket.id})
      }
      
      console.log(users)
      io.sockets.emit('active', users);
    })
  })

  socket.on('msg-private',(data)=>{
    io.sockets.to(`${data.id}`).emit('msg-private', data.text);
  })

});