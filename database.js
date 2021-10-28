const { createPool } = require("mysql2");

const pool = createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Password1@",
  database: "FSA",
  connectionLimit: 10,
});

// pool.query("select * from contractors", (err, result, fields) => {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log(result);
// });

pool.getConnection((err) => {
  if (!err) console.log("DB Connection succeded");
  else console.log(err);
});

module.exports = pool.promise();
