const got = require("got");

class Call {
  constructor() {
    this.api = got.extend({
      responseType: "json",
    });
  }

  setPrefixURL = (url) => {
    this.api = this.api.extend({
      prefixUrl: url,
    });
  };

  call = async (path, method = "GET", options = {}) => {
    options = options || {};
    const searchParams = options.searchParams || {};
    const headers = options.headers || {};
    const json = options.json || (method === "GET" ? undefined : {});

    let res;
    try {
      res = await this.api(path, {
        headers,
        searchParams,
        method,
        json,
      });
    } catch (error) {
      console.log(error);
    }
    res = { status: res.statusCode, body: res.body };
    return res;
  };
}

var api = new Call();
module.exports = api;
