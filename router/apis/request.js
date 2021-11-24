const router = require("express").Router();
const database = require("../../database");
const Contractor = require("../../model/contractor");

router.post("/requestaccess", async (req, res) => {
  var name;
  if (res.error) {
    res.status(400).send(res.error.details[0].message);
    return;
  }

  //1. Check if Table has request
  let sql = `SELECT * FROM contractors c WHERE c.name="${req.body.name}"`;
  //destructure row packet data and resultsheader
  const [tolog, _] = await database.execute(sql);
  if (tolog[0] != undefined) {
    name = tolog[0].ContractorId;
    let sql1 = `INSERT INTO Requests(ContractorId,Timing,Approval,SMSApproval) values("${name}","${req.body.timing}","0","0")`;
    await database.execute(sql1);
    res.send("registered");
  }

  return;
});

router.get("/requestaccess", (req, res) => {
  res.render("accessrequest.hbs");
});

module.exports = router;
