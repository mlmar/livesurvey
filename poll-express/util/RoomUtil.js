const ROOMS = new Map();

class Room {
  constructor(id, host, survey) {
    this.id = id;
    this.host = host;
    this.users = new Set();

    this.title = survey.title;
    this.questions = survey.questions;
    this.votes = survey.questions.map(this.initPoll);
    this.index = 0;

    this.interval = null;
    this.polling = false;
  }

  getID() {
    return this.id();
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

  getSurvey() {
    return { 
      id: this.id,
      questions: this.questions,
      index: this.index
    }
  }

  getCurrentQuestion() {
    return this.questions[this.index];
  }

  prevQuestion() {
    if(this.index > 0) this.index--;
    return this.getCurrentQuestion();
  }

  nextQuestion() {
    if(this.index < this.questions.length - 1) this.index++;
    return this.getCurrentQuestion();
  }

  getIndex() {
    return this.index;
  }

  vote(socketID, answerIndex) {
    const poll = this.votes?.[this.index];
    if(!poll?.[answerIndex] || !this.polling) return;
    if(poll[answerIndex].has(socketID)) return;
    for(let i = 0; i < poll.length; i++) {
      poll[i].delete(socketID);
    }
    poll[answerIndex].add(socketID);
    console.log(poll);
  }

  startPolling() {
    this.polling = true;
  }

  stopPolling() {
    this.polling = false;
  }

  resetPoll() {
    this.votes[this.index] = this.initPoll(this.questions[this.index]);
  }

  initPoll(question) {
    const ansArray = [];
    for (let i = 0; i < question.answers.length; i++) {
      ansArray.push(new Set());
    }
    return ansArray;
  }

  getVoteCounts() {
    const votesArray = [];
    for(let i = 0; i < this.votes.length; i++) {
      votesArray.push(this.votes[i].map((set) => set.size));
    }
    return { max: this.users.size, counts: votesArray };
  }

  startInterval(callback, time) {
    if(this.interval) return;
    this.interval = setInterval(() => {
      callback(this.getVoteCounts());
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