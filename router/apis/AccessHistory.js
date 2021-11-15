const router = require("express").Router();
const database = require("../../database");
const AccessHistory = require("../../model/accessHistory");

router.post("/", async (req, res) => {
  if (res.error) {
    res.status(400).send(res.error.details[0].message);
    return;
  }

  const accesshistory = new AccessHistory();
  var sgdate;
  let results;
  var testing;

  //1. Check if Table has request
  let sql = `SELECT * FROM Requests r INNER JOIN contractors c ON c.ContractorId=r.ContractorId
            WHERE c.name="${req.body.name}" AND r.Approval=1`;

  //destructure row packet data and resultsheader
  const [tolog, _] = await database.execute(sql);
  if (tolog[0] != undefined) {
    //Obtain the request
    results = tolog[0];
    //Obtain the Request date
    sgdate = await new Date(tolog[0].Timing).toString();
    testing = await new Date(sgdate.toString());
    console.log(testing.getFullYear());
    res.send(tolog[0]);
  }

  return;
});

//returns the GMT timing. so i need to +8

router.get("/requestaccess", (req, res) => res.send("login"));
module.exports = router;
