var express = require("express");
var fs = require("fs");
var path = require("path");
const app = express();
const router = express.Router();
var os = require("os");
var http = require("http");
var cate = require("../controllers/cateController");
var dbCongif = require("../util/dbconfig");
var mysql = require("mysql");

router.post("/getAvat", (req, res) => {
  let id = req.body.id;
  // console.log(id);
  let status = false;
  let sql = `select avatar,name from users where id = '${id}'`;
  let conn = mysql.createConnection(dbCongif.config);
  let imgurl,name
  conn.query(sql, (err, data) => {
    if (data[0].avatar) {
      status = true;
      imgurl = data[0].avatar
      name = data[0].name
      // console.log(data[0].avatar);
    } else {
      // console.log(data[0].password);
    }
  });
  conn.end();
  setTimeout(() => {
    if (status) {
      res.status(200).json({ code: 200, url:imgurl, username:name });
    } else {
      res.status(299).json({ code: 299 });
    }
  }, 50);
});

module.exports = router;
