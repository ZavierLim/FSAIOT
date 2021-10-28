const { createPool } = require("mysql2");

const pool = createPool({
  host: "fsaiot.cyx3oieygt7p.ap-southeast-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "admin123",
  database: "fsa",
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
