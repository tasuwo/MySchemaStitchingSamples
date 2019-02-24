const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
});

module.exports = {
  fetchItemById: id => {
    return new Promise((resolve, reject) =>
      conn.query(
        "SELECT * FROM `source`.`item` WHERE `item`.`id` = ?",
        [id],
        (err, results, fields) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0]);
        }
      )
    );
  },
  fetchItemByType: type => {
    return new Promise((resolve, reject) =>
      conn.query(
        "SELECT * FROM `source`.`item` WHERE `item`.`type` = ?",
        [type],
        (err, results, fields) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        }
      )
    );
  }
};
