const express = require('express');
const router = module.exports = express.Router();
const roomUtil = require('../util/RoomUtil.js');

router.get('/', (req, res) => {
  res.send(respond(0, "SURVEY API URL", null));
});

router.get('/create', (req, res) => {
  const id = roomUtil.create()
});