const DEV = false;

export const SERVER_URL = DEV ? "http://localhost:3300" : "https://livesurvey-auth.herokuapp.com";
export const SOCKET_URL = DEV ? "ws://localhost:3300" : "wss://livesurvey-auth.herokuapp.com";