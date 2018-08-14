const path = require("path");
const read = require("./read.js");



const handelHomePage = (request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  read(path.join(__dirname, "..", "..", "public", "index.html"), (err, res) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Sorry, There is a problem</h1>");
    } else {
      response.end(res);
    }
  });
};

const serverStaticFile = (request, response) => {
    const endponit = request.url;
    const extention = endponit.split(".")[1];
    const contenttype = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      jpg: "image/jpg",
      png: "image/png",
      json: "application/json",
      gif: "image/gif"
    };
    response.writeHead(200, {
      "content-type": contenttype[extention]
    });
  
    read(path.join(__dirname, "..", "..", endponit), (err, res) => {
      if (err) {
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Sorry, There is a problem</h1>");
      } else response.end(res);
    });
  };


const handelError = response => {
    response.writeHead(404, { "content-type": "text/html" });
    read(path.join(__dirname, "..", "..", "public", "errp.html"), (err, res) => {
      if (err) {
        response.end(err.message);
      } else response.end(res);
    });
  };



  module.exports = {
    handelHomePage,
    serverStaticFile,
    handelError
  };