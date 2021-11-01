const router = require("express").Router();
const database = require("../../database");
const AccessHistory = require("../../model/accessHistory");

router.post("/accesshistory", async (req, res) => {
  if (res.error) {
    res.status(400).send(res.error.details[0].message);
    return;
  }

  const accesshistory = new AccessHistory();

  //1. Check if Table has request
  let sql = `SELECT * FROM Requests r INNER JOIN Contractors c ON c.ContractorId=r.ContractorId
            WHERE c.name=${req.body.name}`;

  //destructure row packet data and resultsheader
  const [tolog, _] = await database.execute(sql);
  if (tolog[0] != undefined) {
    console.log(tolog);
  }
  console.log("ok");
  return;
});

router.get("/requestaccess", (req, res) => res.send("login"));
module.exports = router;
