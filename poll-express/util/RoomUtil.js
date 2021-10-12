const { v4 } = require('uuid');
const ROOMS = new Map();

class Room {
  constructor(id) {
    this.id = id;
    this.host = null;
    this.title = "";
    this.questions = [];
    this.votes = null;
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

  setSurvey(survey) {
    this.title = survey.title;
    this.questions = survey.questions;
    this.votes = this.questions.map((question) => [...question.answers].fill(0));
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

const create = (survey) => {
  const id = v4();
  ROOMS.set(id, new Room(id));
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