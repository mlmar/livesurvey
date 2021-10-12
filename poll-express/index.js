const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

respond = (status, message, data) => new Object({ status, message, data });

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening on", port);
});

const surveyAPI = require('./api/SurveyAPI.js');
app.use('/survey', surveyAPI);

const socketServer = require('./socket/SocketServer.js');
socketServer(app);

app.get('/', (req, res) => {
  res.send(respond(0, "HOME ROOT", null))
});