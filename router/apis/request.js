const router = require("express").Router();
const database = require("../../database");
const Contractor = require("../../model/contractor");

router.post("/requestaccess", async (req, res) => {
  if (res.error) {
    res.status(400).send(res.error.details[0].message);
    return;
  }

  const contractor = new Contractor();
  contractor.name = req.body.name;
  contractor.company = req.body.company;
  contractor.phonenumber = req.body.phonenumber;
  contractor.photo = req.body.photo;

  //  let sql = `SELECT * FROM contractors c WHERE c.name="${contractor.name}"`;
  let sql = `SELECT * FROM contractors c WHERE c.name="${contractor.name}"`;
  //destructure row packet data and resultsethea.der
  const [tolog, _] = await database.execute(sql);
  if (tolog[0] == undefined) {
    res.send(null);
    return;
  }
  res.send(tolog); //return the course;
  console.log("ok");
  return;
});

router.get("/requestaccess", (req, res) => res.send("login"));
module.exports = router;
