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
router.post("/addContractor", async (req, res) => {
  const contractor = new Contractor();
  contractor.name = req.body.name;
  contractor.company = req.body.company;
  contractor.phonenumber = req.body.phonenumber;
  contractor.photo = req.body.photo;

  //1. Check if Table has request
  let sql = `SELECT * FROM contractors c WHERE c.name="${contractor.name}"`;
  //destructure row packet data and resultsheader
  const [tolog, _] = await database.execute(sql);
  if (tolog[0] == undefined) {
    res.send(null);
    return;
  }
  res.send(tolog);
  console.log("ok");

  return;
});

router.get("/register", (req, res) => {
  res.render("register.hbs");
});

router.post("/register", async (req, res) => {
  let sql = `INSERT INTO contractors(Name,Company,PhoneNumber) values("${req.body.name}","${req.body.company}","${req.body.phone}")`;
  await database.execute(sql);
  res.send("Registered");
});

module.exports = router;
