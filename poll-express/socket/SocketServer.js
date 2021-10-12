const { v4 } = require('uuid');
const ws = require('ws');
const roomUtil = require('../util/RoomUtil.js');



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
  roomUtil.print();
}



/*** message listeners ***/

listen('CREATE_SURVEY', (socket, payload) => {
  if(!payload.title || !payload.questions) {
    console.log("Missing survey data")
    return;
  }

  const id = roomUtil.create(socket.id, payload);
  console.log("Creating survey", id);
  to(socket, 'SET_SURVEY_ID', id);
});

listen('JOIN_SURVEY', (socket, payload) => {
  socket.room = payload.room;
});

/*
  socket event initialization function
    - {server}  : express server to attach to
    - reads all incoming connections, messages and closes connections
*/
const init = (server) => {
  console.log("Initializing socket server");
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