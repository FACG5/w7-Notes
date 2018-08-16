const {
  handelHomePage,
  serverStaticFile,
  insetUser,
  login,
  logout,
  handelError,
  handleSignUp,
  handelWebPage,
  addpost,
  getName,
  displayPosts
} = require("./handler/functions.js");
const path = require("path");
const { parse } = require("cookie");
const { verify } = require("jsonwebtoken");

const router = (req, res) => {
  const endponit = req.url;
  if (endponit === "/") {
    if (req.headers.cookie) {
      const { jwt } = parse(req.headers.cookie);
      if (jwt) {
        verify(jwt, process.env.SECRET, (err, jwt) => {
          res.writeHead(302, { location: "/home" });
          res.end();
        });
      } else {
        handelHomePage(req, res);
      }
    } else {
      handelHomePage(req, res);
    }
  } else if (endponit.includes("public")) {
    serverStaticFile(req, res);
  } else if (endponit === "/signup" && req.method === "POST") {
    insetUser(req, res);
  } else if (endponit === "/signup" && req.method === "GET") {
    handleSignUp(req, res);
  } else if (endponit === "/login") {
    login(req, res);
  } else if (endponit === "/logout") {
    logout(req, res);
  } else if (endponit === "/home") {
    if (req.headers.cookie) {
      const { jwt } = parse(req.headers.cookie);
      console.log(jwt);

      if (jwt) {
        verify(jwt, process.env.SECRET, (err, jwt) => {
          handelWebPage(req, res);
        });
      } else {
        handelHomePage(req, res);
      }
    } else {
      res.writeHead(302, { location: "/" });
      res.end();
    }
  } else if (endponit === "/addpost" && req.method === "POST") {
    addpost(req, res);
  } else if (endponit === "/getname") {
    getName(req, res);
  } else if (endponit === "/post") {
    displayPosts(req, res);
  } else {
    handelError(res);
  }
};

module.exports = router;
