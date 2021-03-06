"use strict";

const path = require("path");
const read = require("./read.js");
const { getuserpost, getlastpost } = require("../database/queries/getdata");
const { addUser, addPost } = require("../database/queries/postdata");
const { deletepost } = require("../database/queries/delete");
const { checkUser } = require("../database/queries/checkuser");
const bcrypt = require("bcryptjs");
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
const querystring = require('querystring');

const handelHomePage = (request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  read(
    path.join(__dirname, "..", "..", "public", "login.html"),
    (err, res) => {
      if (err) {
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Sorry, There is a problem</h1>");
      } else {
        response.end(res);
      }
    }
  );
};

const handleSignUp = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  read(
    path.join(__dirname, '..', '..', 'public', 'signup.html'),
    (err, res) => {
      if (err) {
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Sorry, There is a problem</h1>");
      } else {
        response.end(res);
      }
    }
  );
}

///hashpassword
const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(password, salt, callback);
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

const insetUser = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;

  });
  request.on("end", () => {
    const user = JSON.parse(data);

    // const user = querystring.parse(data);

    const { name, email, password } = user;
    if (user.name && user.email && user.password) {
      hashPassword(password, (err, hash) => {
        if (err) {
          response.end(JSON.stringify({ err: err }));
        } else {
          addUser(name, email, hash, (err, res) => {
            if (err) {
              response.end(JSON.stringify({ err: err }));
            } else {
              // response.writeHead(302, {
              //   'Location': "/"
              // });
              return response.end(
                JSON.stringify({ err: null, result: JSON.stringify(res) })
              );
            }
          });
        }
      });
    } else {
      // response.end(JSON.stringify({ err: "Please Enter Data User! " }));
    }
  });
};

const login = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const user = querystring.parse(data);
    const { email, password } = user;
    if (user.email && user.password) {
      checkUser(email, password, (err, res) => {
         if (err) {
          response.end(JSON.stringify({ err: err }));
        } else if (res.length === 0) {
          response.writeHead(500, { "content-type": "text/html" });
          response.end("<h1>User not found</h1>");
        } else {
          const userDetails = { userId: res[0].id, name: res[0].name };
          const cookie = sign(userDetails,  process.env.SECRET);
          bcrypt.compare(password, res[0].password, (err, res) => {
          if (err) {
            return new Error('Error');
            
          } else if (res === false) {
              response.end(JSON.stringify({ err: "error password " }));
            } else {
              response.writeHead(302, {
                Location: "/home",
                "Set-Cookie": `jwt=${cookie}; HttpOnly`
              });
              response.end(
                JSON.stringify({ err: null, result: JSON.stringify(res) })
              );
            }
          });
        }
      });
    } else {
      response.end(JSON.stringify({ err: "Please Enter Data User! " }));
    }
  });
};
const logout = (request, response) => {
  response.writeHead(302, {
    Location: "/",
    "Set-Cookie": `jwt=0; Max-Age=0`
  });
  response.end();
};

const displayPosts=(request,response)=>{
  response.writeHead(200, {'content-type':'text/html'
  });
  getlastpost((err,res)=>{
    if (err) {
      response.end(JSON.stringify({ err: err }));
    } else {
      response.end(JSON.stringify({ err: null, result: JSON.stringify(res) }));
    }
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

const handelWebPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  read(
    path.join(__dirname, '..', '..', 'public', 'home.html'),
    (err, res) => {
      if (err) {
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Sorry, There is a problem</h1>");
      } else {
        response.end(res);
      }
    }
  );
}

const addpost = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const finalData = querystring.parse(data);
    const {jwt}=parse(request.headers.cookie);
    verify(jwt,process.env.SECRET,(err,jwt)=>{
      
      if(err){
        return send401(response);
      }else{
    const user_id = jwt.userId
    const {
      title,
      description} = finalData;
    addPost(title, description, user_id, (err, res) => {
      if (err) {
        response.end(JSON.stringify({ err: err }));
      } else {
        response.writeHead(302, { 'location': '/home' });
        return response.end();
      }
    })
  }
})
  });
}

const getName = (request, response) => {
  const {jwt}=parse(request.headers.cookie);
  verify(jwt,process.env.SECRET,(err,jwt)=>{
    if(err){
      return send401(response);
    }else{
      response.end(JSON.stringify({err: null, result: jwt.name}));
    }
  })  
}

const send401 = (response) => {
  const message = 'fail!';
  response.writeHead(
    401,
    {
      'Content-Type': 'text/plain',
      'Content-Length': message.length
    }
  );
  return response.end(message);
}

















module.exports = {
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
};
