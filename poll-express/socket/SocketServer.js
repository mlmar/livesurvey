const { v4 } = require('uuid');
const ws = require('ws');
const rooms = require('../util/RoomUtil.js');



/*** socket management ***/

const CLIENTS = new Map();
const LISTENERS = {};
const listen = (action, func) => LISTENERS[action] = func;

// broadcasts to all users in an array
const broadcast = (users, action, payload) => {
  const message = JSON.stringify({ action, payload });
  users?.forEach((u) => {
    CLIENTS.get(u.id).send(message);
  });
}

// broadcast to a specific socket
const to = (socket, action, payload) => {
  const message = JSON.stringify({ action, payload });
  socket.send(message);
}


const handleConnection = (socket) => {
  const id = v4();
  socket.id = id;
  CLIENTS.set(id, socket);
  console.log('Client',`[${socket.id}]`, 'connected to server');
  to(socket, 'SET_ID', id);
}

const handleMessage = (socket, data) => {
  const message = JSON.parse(data);
  const { action, payload } = message;
  // console.log('Message from client', `[${socket.id}]`, ':', message);
  if(LISTENERS[action]) LISTENERS[action](socket, payload);
}

const handleClose = (socket) => {
  const { room, id } = socket;
  console.log('Client', `[${id}]`, 'disconnected');
  const users = rooms.leave(room, id)
  broadcast(users, 'SET_USERS', users);

  const game = games.get(room)?.refreshHost(id, users);
  if(game) {
    games.get(room).deletePlayer(socket.id);
    broadcast(users, 'GAME_UPDATE', games.info(room));
  } else {
    games.remove(room);
  }
  
  rooms.print();
}



/*** message listeners ***/

listen('JOIN_ROOM', (socket, payload) => {
  socket.room = payload.room;
  const users = rooms.join(payload.room, socket.id, payload);
  broadcast(users, 'SET_USERS', users);
  
  const game = games.create(socket.room, socket.id);
  if(!game.inProgress) games.get(socket.room).setPlayers(users);
  broadcast(users, 'GAME_UPDATE', game)

  rooms.print();
});

/*
  socket event initialization function
    - {server}  : express server to attach to
    - reads all incoming connections, messages and closes connections
*/
const init = (server) => {
  const wsServer = new ws.Server({ server });
  wsServer.on('connection', (socket) => {
    handleConnection(socket);
    
    socket.on('message', (data) => {
      handleMessage(socket, data);
    });
    
    socket.on('close', () => {
      handleClose(socket);
    });
  });
}


module.exports = init;