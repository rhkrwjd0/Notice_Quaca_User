const admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// fcm보내기!
const sendFCM = (Token, time, dataInfo) => {
  return new Promise((resolve, reject) => {

    let dataStr = JSON.stringify(dataInfo);
    let message = {};
    if (time == null) {
      message = {
        notification: {
          title: "제조완료알림",
          body:
            "주문하신메뉴가 제조완료 되었습니다. \n픽업대에서 메뉴를 받아주세요!",
        },
        token: Token,
        data : {info : dataStr}
      };
    } else {
      message = {
        notification: {
          title: "접수알림",
          body: `주문하신메뉴가 주문접수 되었습니다. \n${time} 제조완료 예정입니다!`,
        },
        token: Token,
        data : {info : dataStr}
      };
    }

    // 알림보내기
    admin
      .messaging()
      .send(message)
      .then(function (response) {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
        resolve(true);
      })
      .catch((err) => {
        console.log("Error sending message:", err);
        reject(err);
      });
  });
};

exports.sendFCM = sendFCM;
