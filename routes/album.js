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

router.post("/", (req, res) => {
//   console.log(req.body);
  let status = -1;
  let sql = `select name,img from albums`;
  let content 
  let conn = mysql.createConnection(dbCongif.config);
  conn.query(sql, (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        status = 1062;
      }
    }else{
        content = data
    }
  });
  conn.end();
  setTimeout(() => {
    if (status === -1) {
      res.status(200).json({ code: 200,content:content });
    } else if (status === 1062) {
      res.status(299).json({ code: 299 });
    }
  }, 50);
});

module.exports = router;
