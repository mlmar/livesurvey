const ROOMS = new Map();

class Room {
  constructor(id, host, survey) {
    this.id = id;
    this.host = host;
    this.users = new Set();

    this.title = survey.title;
    this.questions = survey.questions;
    this.votes = survey.questions.map((question) => [...question.answers].fill(0));
    this.index = 0;

    this.interval = null;
    this.polling = false;
  }

  getID() {
    return this.id();
  }

  setHost(id) {
    this.host = id;
  }

  getHost() {
    return this.host;
  }

  addUser(user) {
    this.users.add(user);
  }

  removeUser(user) {
    this.users.delete(user);
  }

  getUsers() {
    return Array.from(this.users);
  }

  getCurrentQuestion() {
    return this.questions[this.current];
  }

  getPrevQuestion() {
    if(this.current > 0) this.current--;
    return this.questions[this.current]
  }

  getNextQuestion() {
    if(this.current < this.questions.length - 1) this.current++;
    return this.questions[this.current];
  }

  vote(voteIndex) {
    if(this.votes?.[this.index]?.[voteIndex] && this.polling) 
    this.votes[this.index][voteIndex]++;
  }

  startPolling() {
    this.polling = true;
  }

  stopPolling() {
    this.polling = false;
  }

  resetPoll() {
    this.votes[this.index] = [...this.questions[this.index].answers].fill(0);
  }

  getVotes() {
    return this.votes;
  }

  startInterval(callback, time) {
    if(this.interval) return;
    this.interval = setInterval(() => {
      callback(votes);
    }, time);
  }

  stopInterval() {
    if(!this.interval) return;
    clearInterval(this.interval);
  }
}

// random 5 letter id
const randomID = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for(var i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const create = (host, survey) => {
  const id = randomID();
  ROOMS.set(id, new Room(id, host, survey));
  return id;
}

const remove = (room) => {
  ROOMS.delete(room);
}



const get = (room) => {
  return ROOMS.get(room);
}

const print = () => {
  console.log(ROOMS);
}

module.exports = { create, remove, get, print };