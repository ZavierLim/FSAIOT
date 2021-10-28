const router = require("express").Router();
const database = require("../../database");
const Contractor = require("../../model/contractor");

router.get("/all", async (req, res) => {
  let sql = "SELECT * FROM contractors";

  //destructure row packet data and resultsethea.der
  const [tolog, _] = await database.execute(sql);
  console.log(tolog);

  res.send(tolog);
});

//route to CRUD users into FR device
//router.post

module.exports = router;
