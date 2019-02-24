const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "pw",
  port: 3306
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
