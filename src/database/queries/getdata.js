const dbconnection = require("../db_connection");


//getmyNotesuser
const sqluser = { text: "SELECT *  FROM post ;" };
const getuserpost = cb =>
  dbconnection.query(sqluser, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });

  //getLastnotes
  const sqllastpost = { text: "SELECT post.*, users.name  FROM post INNER JOIN users ON post.user_id = users.id ORDER BY post.create_at DESC LIMIT 10;"};
  const getlastpost = cb =>
  dbconnection.query(sqllastpost, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });


  module.exports = {
    getuserpost,
    getlastpost
  };
