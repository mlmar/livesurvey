class HTTPService {
  async get(endpoint) {

    try {
      const response = await fetch(endpoint, {
        method: 'get',
        headers: { 'Content-Type' : 'application/json' }
      });
      return response;
    } catch(error) {
      console.error("Error make get request to", endpoint);
      console.error(error);
      return null;
    }
  }

  async post(endpoint, body) {
    try {
      const response = await fetch(endpoint, {
        method: 'post',
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify(body)
      });
      return response;
    } catch(error) {
      console.error("Error make post request to", endpoint);
      console.error(error);
      return null;
    }
  }
}

export default HTTPService;