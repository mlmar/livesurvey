const DEV = true;

export const SERVER_URL = DEV ? "http://localhost:3300" : "https://livesurvey-express.herokuapp.com";
export const SOCKET_URL = DEV ? "ws://localhost:3300" : "ws://livesurvey-express.herokuapp.com";