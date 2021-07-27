var conn = require("./connection");

// 사용자토큰 가져오기
const SelectUserToken = (UserPayId) => {
  return new Promise((resolve, reject) => {
    let payInfo = [UserPayId];
    let query1 = "SELECT Token FROM User WHERE Ssokey=(SELECT Ssokey FROM UserPay WHERE UserPayId=?);";
    let sql1 = require('mysql').format(query1 , payInfo);
    let query2 = "SELECT SUBSTRING(UserPayDid,9,3) AS OrderNum, DATE_FORMAT(InsertDt,'%Y.%m.%d %h:%i') AS InsertDt, MenuName, OrderCnt FROM UserPayDetail WHERE UserPayId = ?;"
    let sql2 = require('mysql').format(query2 , payInfo);   

    console.log("SelectUserToken SELECT data > " + UserPayId);
    conn.connection.query(sql1+sql2, (error, rows) => {
      if (error) {
        console.log(UserPayId + " > SelectUserToken error - ", Date());
        console.log(error);
        console.log("errno > " + error.errno);
        console.log("sqlMessage > " + error.sqlMessage);
        reject(error.sqlMessage);
      } else {
        console.log(UserPayId + " > SelectUserToken success - ", Date());
        resolve(rows);
      }
    });
  });
};

exports.SelectUserToken = SelectUserToken;
