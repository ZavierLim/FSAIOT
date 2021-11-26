const router = require("express").Router();
const { equal } = require("assert");
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
    console.log(req.body);
    await database.execute(sql1);
    res.send("registered");
  }

  return;
});

router.get("/requestaccess", (req, res) => {
  var data = new Date(Date.now());
  res.render("accessrequest.hbs", data);
});

router.get("/approve", async (req, res) => {
  var data = new Date(Date.now());
  //1. Check if Table has request
  let sql = `SELECT * FROM Requests r INNER JOIN contractors c ON c.ContractorId=r.ContractorId
    WHERE r.Approval=0`;

  //destructure row packet data and resultsheader
  const [tolog, _] = await database.execute(sql);
  if (tolog[0] != undefined) {
    //1. Obtain the request from request table
    results = await tolog;
    console.log(results);
    res.render("approverequest.hbs", { results });
  }
});

router.post("/approve", async (req, res) => {
  console.log(req.body.approval); //12

  if (!isNaN(req.body.approval)) {
    let sql = `UPDATE Requests r SET r.approval = "1" WHERE RequestId = ${req.body.approval}`;
    await database.execute(sql);
    res.send("registed 1 number");
    return;
  } else if (req.body.approval.length > 1) {
    for (i = 0; i < req.body.approval.length; i++) {
      let sql = `UPDATE Requests r SET r.approval 
      = "1" WHERE RequestId = ${req.body.approval[i]}`;
      await database.execute(sql);
    }
    res.send("registed >1 number");
    return;
  }
});

module.exports = router;
