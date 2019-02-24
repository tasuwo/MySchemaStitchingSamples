const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
});

module.exports = {
  fetchUserById: id => {
    return new Promise((resolve, reject) =>
      conn.query(
        "SELECT * FROM `source`.`user` WHERE `user`.`id` = ?",
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
  fetchUserByRole: role => {
    return new Promise((resolve, reject) =>
      conn.query(
        "SELECT * FROM `source`.`user` WHERE `user`.`role` = ?",
        [role],
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
