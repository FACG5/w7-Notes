const dbconnection = require("../db_connection");
const deletepost = (id, cb) => {
  let sql = {
    text: "DELETE FROM post where id = $1",
    values: [id]
};
  dbconnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};
module.exports = { deletepost};