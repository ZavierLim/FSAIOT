const router = require("express").Router();
var api = require('../../node_modules/clicksend/api');



var smsApi = new api.SMSApi("1413778858@qq.com", "A6C3CF62-8382-0407-9409-DB5B659F98BC");

var q = "test";
var page = 1;
var limit = 10;

smsApi.smsInboundGet(q, page, limit).then(function(response) {
  console.log(response.body);
}).catch(function(err){
  console.error(err.body);
});


console.log(smsApi);
router.get("/reply", async (req, res) => {
  res.send("test");

});

module.exports = router;