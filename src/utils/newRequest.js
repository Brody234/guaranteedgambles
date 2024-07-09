const live = true

const baseURL = live? "https://guaranteedgambles-4671d37f785e.herokuapp.com" : "http://localhost:4444";

const newRequest = {
  baseUrl: baseURL,
  setHeaders: function (token) {
    let headers = { "Content-Type": "application/json" };
    if (token && token !== "") {
      console.log(token);
      headers["Authorization"] = `Bearer ${encodeURIComponent(token)}`;
    }
    return headers;
  },
  handleResponse: async function (response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response format: ${text}`);
    }
  },
  get: async function (str, token = null) {
    const headers = this.setHeaders(token);
    try {
      const response = await fetch(this.baseUrl + str, {
        method: "GET",
        headers: headers,
      });
      console.log(response)
      return await this.handleResponse(response);
    } catch (err) {
      console.log(err);
    }
  },
  post: async function (str, options = {}, token = null) {
    console.log('base url')
    console.log(baseURL)
    const headers = this.setHeaders(token);
    const body = options ? options : null;
    try {
      const response = await fetch(this.baseUrl + str, {
        method: "POST",
        headers: headers,
        body: body ? JSON.stringify(body) : null,
      });
      return await this.handleResponse(response);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },
  patch: async function (str, options = {}, token = null) {
    const headers = this.setHeaders(token);
    const body = options ? options : null;

    try {
      const response = await fetch(this.baseUrl + str, {
        method: "PATCH",
        headers: headers,
        body: body ? JSON.stringify(body) : null,
      });
      return await this.handleResponse(response);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },
  delete: async function (str, options = {}, token = null) {
    const headers = this.setHeaders(token);
    const body = options ? options : null;
    try {
      const response = await fetch(this.baseUrl + str, {
        method: "DELETE",
        headers: headers,
        body: body ? JSON.stringify(body) : null,
      });
      return await this.handleResponse(response);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },
};

export default newRequest;