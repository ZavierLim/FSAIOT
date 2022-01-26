const router = require("express").Router();
const { access } = require("fs");
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

  //Prep variables for SQL statement
  let currentdate = new Date(Date.now());
  let sqldatebefore = `${currentdate.getFullYear()}-${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()}`;

  let sqldateafter = `${currentdate.getFullYear()}-${
    currentdate.getMonth() + 1
  }-${currentdate.getDate() + 1}`;

  //1. Check if Table has request
  let sql = `SELECT * FROM Requests r INNER JOIN contractors c ON c.ContractorId=r.ContractorId
            WHERE c.name="${req.body.name}" AND r.Approval=1 AND r.SMSApproval=1 AND r.Timing>"${sqldatebefore}" AND r.Timing<"${sqldateafter}"`;

  //destructure row packet data and resultsheader
  const [tolog, _] = await database.execute(sql);
  if (tolog[0] != undefined) {
    //1. Obtain the request from request table
    results = await tolog[0];
    console.log(results);
    //2. Obtain the Request date, if the date is the same as today's date , continue
    sgdate = await new Date(tolog[0].Timing.toString());
    console.log(sgdate.toString());
    console.log(sgdate.getDate(), sgdate.getMonth(), sgdate.getFullYear());
    //3. If statement to check if current date is the same as request date
    currenttimestamp = new Date(Date.now());
    //save into access history table
    accesshistory.RequestId = tolog[0].RequestId;
    let sql2 = `INSERT INTO AccessHistory(RequestId,DateTimeEntered) values(${accesshistory.RequestId},NOW())`;
    await database.execute(sql2);
    res.send("Access Granted");
    return;
  }
  res.send("Access Not Granted");
  return;
});

//returns the GMT timing. so i need to +8
//Note: Dates i see in MYSQL DB is +8GMT. When SQL statement is executed, +0GMT is returned. use ToString() to get to SGDate

router.get("/requestaccess", (req, res) => res.send("login"));
module.exports = router;
