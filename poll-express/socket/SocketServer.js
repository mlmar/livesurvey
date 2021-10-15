const { v4 } = require('uuid');
const ws = require('ws');
const roomUtil = require('../util/RoomUtil.js');



/*** socket management ***/

const CLIENTS = new Map();
const LISTENERS = {};
const listen = (action, func) => LISTENERS[action] = func;

// broadcasts to all users in an array
const broadcast = (sockets, action, payload) => {
  const message = JSON.stringify({ action, payload });
  sockets?.forEach((id) => {
    CLIENTS.get(id).send(message);
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
  if(roomUtil.get(room)) roomUtil.get(room).removeUser(id);
  roomUtil.print();
}



/*** message listeners ***/

listen('CREATE_SURVEY', (socket, payload) => {
  if(!payload.title || !payload.questions) {
    console.log("Missing survey data")
    return;
  }

  const id = roomUtil.create(socket.id, payload);
  socket.room = id;
  to(socket, 'CREATE_SURVEY', id);
  console.log("Creating survey", id);
});

listen('JOIN_SURVEY', (socket, payload) => {
  const { surveyID } = payload;
  const roomObj = roomUtil.get(surveyID);
  if(!roomObj) return;
  socket.room = surveyID;
  roomObj.addUser(socket.id);
  roomUtil.print();
  console.log("Client", `[${socket.id}]`, "joined room", payload.surveyID)
});

listen('START_INTERVAL', (socket) => {
  const { room, id } = socket;
  const roomObj = roomUtil.get(room);
  if(!roomObj && roomObj.getHost() !==  id) return;
  roomObj.startInterval((votes) => {
    to(socket, 'SET_VOTES', votes);
    broadcast([...roomObj.getUsers(), id], 'SET_SURVEY', roomObj.getSurvey());
  }, 300);
});

listen('SET_QUESTION', (socket, payload) => {
  const { room, id } = socket;
  const { type } = payload;
  const roomObj = roomUtil.get(room);
  if(!roomObj && roomObj.getHost() !==  id) return;
  if(type === "next") {
    roomObj.nextQuestion()
  } else if(type === "prev") {
    roomObj.prevQuestion();
  }
});

listen('SET_POLLING', (socket, payload) => {
  const { room, id } = socket;
  const { paused } = payload;
  const roomObj = roomUtil.get(room);
  if(!roomObj && roomObj.getHost() !==  id) return;
  if(paused) {
    roomObj.stopPolling();
  } else {
    roomObj.startPolling();
  }
})

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