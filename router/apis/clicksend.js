const router = require("express").Router();
const database = require("../../database");
const Contractor = require("../../model/contractor");
var api = require('../../node_modules/clicksend/api.js');
var cron = require("node-cron");
const {
  map
} = require("bluebird");

var smsApi = new api.SMSApi("1413778858@qq.com", "A6C3CF62-8382-0407-9409-DB5B659F98BC");


// var q1 = "BLK";
// var q2 = "OTP";
var page = 1;
var limit = 1;
var messageId;
var messageDetails;
var phoneNum;
var phoneFrom;
var otp;
var otpMap = new Map();
var access;
var accessMap = new Map();
var smsMessage = new api.SmsMessage();
var smsCollection = new api.SmsMessageCollection();

cron.schedule('*/5 * * * * * ', () => {
  console.log('running every second 5');
  smsApi.smsInboundGet(page, limit).then(function (response) {
    // wheather in Request or not
    phoneFrom = response.body.data.data[0].from;

    // search contractor
    let sql1 = `SELECT * FROM contractors c WHERE c.phonenumber="${phoneFrom}"`;
    const [tolog1, _] = await database.execute(sql1);

    // if not exist, mark
    if (tolog1[0] == undefined) {
      messageId = response.body.data.data[0].message_id;
      smsApi.smsInboundReadByMessageIdPut(messageId).then(function (response) {

      }).catch(function (err) {
        console.error(err.body);
      });
    }

    // if exist, search the request 
    else {
      let sql2 = `SELECT * FROM Requests r INNER JOIN contractors c ON c.ContractorId=r.ContractorId
      WHERE c.phonenumber="${phoneFrom}"`;
      const [tolog2, _] = await database.execute(sql2);
      if (tolog2[0] == undefined) {
        // send unauthorized SMS
        smsMessage.source = "sdk";
        smsMessage.to = response.body.data.data[0].from;
        smsMessage.body = "Request to unlock the door is invcalid";

        smsCollection.messages = [smsMessage];
        smsApi.smsSendPost(smsCollection).then(function (response) {

        }).catch(function (err) {
          console.error(err.body);
        });

        // mark as read
        messageId = response.body.data.data[0].message_id;
        smsApi.smsInboundReadByMessageIdPut(messageId).then(function (response) {

        }).catch(function (err) {
          console.error(err.body);
        });
      } else {
        if (response.body.data.data[0].body.startsWith("BLK")) {
          console.log("Request OTP");

          messageId = response.body.data.data[0].message_id;
          messageDetails = response.body.data.data[0].body;
          phoneNum = response.body.data.data[0].from;
          // prepare for sending OTP
          smsMessage.source = "sdk";
          smsMessage.to = response.body.data.data[0].from;

          otp = getCode();
          otpMap.set(phoneNum, otp);
          console.log(otpMap);

          access = messageDetails.substring(3, )
          accessMap.set(phoneNum, access)
          console.log(accessMap);

          smsMessage.body = "Your OTP is " + otp;

          // send OTP
          smsCollection.messages = [smsMessage];
          smsApi.smsSendPost(smsCollection).then(function (response) {

          }).catch(function (err) {
            console.error(err.body);
          });

          // mark as read
          smsApi.smsInboundReadByMessageIdPut(messageId).then(function (response) {

          }).catch(function (err) {
            console.error(err.body);
          });
        }
        // receive "OTP" SMS
        if (response.body.data.data[0].body.startsWith("OTP")) {
          console.log("Send OTP");

          var messageNum = response.body.data.data[0].from;
          var messageOTP = response.body.data.data[0].body.substring(3, 9);
          console.log(messageOTP);

          messageId = response.body.data.data[0].message_id;


          smsApi.smsInboundReadByMessageIdPut(messageId).then(function (response) {

          }).catch(function (err) {
            console.error(err.body);
          });

          // compare OTP
          if (otpMap.get(messageNum) == messageOTP) {
            console.log("Unlock " + accessMap.get(messageNum));
          } else {
            console.log("OTP failed")
          }
        }
      }
    }


  }).catch(function (err) {
    console.error(err.body);
  });
});




//   // receive "BLK" SMS
//   if (response.body.data.data[0].body.startsWith("BLK")) { 
//     console.log("Request OTP");

//     messageId = response.body.data.data[0].message_id;
//     messageDetails = response.body.data.data[0].body;
//     phoneNum = response.body.data.data[0].from;
//     // prepare for sending OTP
//     smsMessage.source = "sdk";
//     smsMessage.to = response.body.data.data[0].from;

//     otp = getCode();
//     otpMap.set(phoneNum, otp);
//     console.log(otpMap);

//     access = messageDetails.substring(3, )
//     accessMap.set(phoneNum,access)
//     console.log(accessMap);

//     smsMessage.body = "Your OTP is " + otp;

//     // send OTP
//     smsCollection.messages = [smsMessage];
//     smsApi.smsSendPost(smsCollection).then(function (response) {

//     }).catch(function (err) {
//       console.error(err.body);
//     });

//     // mark as read
//     smsApi.smsInboundReadByMessageIdPut(messageId).then(function (response) {

//     }).catch(function (err) {
//       console.error(err.body);
//     });
//   }
//   // receive "OTP" SMS
//   if (response.body.data.data[0].body.startsWith("OTP")) {
//     console.log("Send OTP");

//     var messageNum = response.body.data.data[0].from;
//     var messageOTP = response.body.data.data[0].body.substring(3, 9);
//     console.log(messageOTP);

//     messageId = response.body.data.data[0].message_id;


//     smsApi.smsInboundReadByMessageIdPut(messageId).then(function (response) {

//     }).catch(function (err) {
//       console.error(err.body);
//     });

//     // compare OTP
//     if (otpMap.get(messageNum) == messageOTP) {
//       console.log("Unlock " + accessMap.get(messageNum));
//     } else {
//       console.log("OTP failed")
//     }
//   }


// }).catch(function (err) {
//   console.error(err.body);
// });


//clear OTP if long time no use
cron.schedule('0 */10 * * * * ', () => {
  otpMap.clear();
  accessMap.clear();
  console.log("Map cleared every 10 minutes");
});

// generate OTP
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getCode() {
  let code = '';
  for (var i = 0; i < 6; i++) {
    code += String.fromCharCode(getRandom(48, 57));
  }
  return code;
}


module.exports = router;