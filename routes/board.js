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
var dayjs = require("dayjs");

router.post("/", (req, res) => {
    let status = false;
    let sql = `select content,date,name,avatar from boards,users where boards.userid = users.id`;
    let content
    let datalength
    let conn = mysql.createConnection(dbCongif.config);
    conn.query(sql, (err, data) => {
        if (data[0]) {
            // console.log(data);
            content = data
            datalength = data.length
            status = true;
        } else {
            console.log('none');
            // console.log(data[0].password);
        }
    });
    conn.end();
      setTimeout(() => {
        if (status) {
          res.status(200).json({
            code: 200,
            content: content,
            datalength:datalength
          });
        } else {
          res.status(299).json({
            code: 299,
          });
        }
      }, 50);
});

router.post("/add", (req, res) => {
    // console.log(req.body);
    let time = dayjs(req.body.datetime).format('YYYY-MM-DD HH:mm:ss');
    let status = false;
    let sql = `insert into boards (id,content,date,userid) values ('${req.body.id}','${req.body.value}','${time}','${req.body.author}')`;
    let conn = mysql.createConnection(dbCongif.config);
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }else{
            status = true
        }
    });
    conn.end();
      setTimeout(() => {
        if (status) {
          res.status(200).json({
            code: 200,
          });
        } else {
          res.status(299).json({
            code: 299,
          });
        }
      }, 50);
});

router.get("/detele", (req, res) => {});

module.exports = router;