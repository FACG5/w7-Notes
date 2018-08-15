const dbconnection = require("../db_connection");

const addUser = (name, email, password, cb) => {
  let sql = {
    text:
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id ;",
    values: [name, email, password]
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
       cb(err);
    } else {
      cb(null, res);
    }
  });
};

// addpost
const addPost = (title, description, create_at, user_id, cb) => {
  let sql = {
    text:
      "INSERT INTO users (title, description, create_at,user_id) VALUES ($1, $2, $3) RETURNING id ;",
    values: [title, description, create_at, user_id]
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      return cb(err);
    } else {
      cb(null, res);
    }
  });
};

module.exports = {
  addUser,
  addPost
};
