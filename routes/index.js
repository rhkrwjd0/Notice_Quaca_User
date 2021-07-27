var express = require("express");
var router = express.Router();
var { sendFCM } = require("../function/sendFCM");
var { SelectUserToken } = require("../function/database//user");

router.get("/", function (req, res, next) {
  res.render("index");
});

// QU_009 제조완료 알림
router.post("/RCsend", function (req, res, next) {
  console.log("1. RCsend 시작 > ", req.body, "-", Date());
  SelectUserToken(req.body.UserPayId)
    .then((resSelectUserToken) => {
      console.log("2. SelectUserToken success -", Date());
      sendFCM(resSelectUserToken[0][0].Token, req.body.time, resSelectUserToken[1])
        .then(() => {
          res.json({ success: true });
          console.log("3. sendFCM success - /RCsend 완료", Date());
          console.log();
        })
        .catch((err) => {
          res.json({ success: false, msg: "sendFCM error" });
          console.log("3. sendFCM catch > ", err, "- /RCsend 완료", Date());
          console.log();
        });
    })
    .catch((err) => {
      res.json({ success: false, msg: "SelectUserToken error" });
      console.log("2. SelectUserToken catch > ", err, "- /RCsend 완료", Date());
      console.log();
    });
});

// QU_013 접수완료 알림
router.post("/PCsend", function (req, res, next) {
  console.log("1. PCsend 시작 > ", req.body, "-", Date());
  SelectUserToken(req.body.UserPayId)
    .then((resSelectUserToken) => {
      console.log("2. SelectUserToken success -", Date());
      sendFCM(resSelectUserToken[0][0].Token, null, resSelectUserToken[1])
        .then(() => {
          
          res.json({ success: true });
          console.log("3. sendFCM success - /PCsend 완료", Date());
          console.log();
        })
        .catch((err) => {
          res.json({ success: false, msg: "sendFCM error" });
          console.log("3. sendFCM catch > ", err, "- /PCsend 완료", Date());
          console.log();
        });
    })
    .catch((err) => {
      res.json({ success: false, msg: "SelectUserToken error" });
      console.log("2. SelectUserToken catch > ", err, "- /PCsend 완료", Date());
      console.log();
    });
});


module.exports = router;
