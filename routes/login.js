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
var formidable = require("formidable");

router.get("/dbtest", cate.getcate);

router.post("/", (req, res) => {
  // console.log(req.body);
  let status = false;
  let sql = `select password from users where id = '${req.body.username}'`;
  let conn = mysql.createConnection(dbCongif.config);
  conn.query(sql, (err, data) => {
    if (data[0].password === req.body.password) {
      status = true;
    } else {
      // console.log(data[0].password);
    }
  });
  conn.end();
  // console.log(req.body.username,'login...');
  setTimeout(() => {
    if (status) {
      res.status(200).json({ code: 200 });
    } else {
      res.status(299).json({ code: 299 });
    }
  }, 50);
});

router.post("/regi", (req, res) => {
  // console.log(req.body);
  let status = -1;
  let sql = `insert into users (id,password,name,sex,email) values ('${req.body.phone}','${req.body.password}','${req.body.nickname}','${req.body.gender}','${req.body.email}')`;
  let conn = mysql.createConnection(dbCongif.config);
  conn.query(sql, (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        status = 1062;
      }
    }
  });
  conn.end();
  setTimeout(() => {
    if (status === -1) {
      res.status(200).json({ code: 200 });
    } else if (status === 1062) {
      res.status(299).json({ code: 299 });
    }
  }, 50);
});

router.post("/upload", (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.resolve(__dirname, "../img");
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    let imgname = Object.keys(files)[0].toString();
    //console.log(files[imgname].path);
    let imgpath = files[imgname].path.split('\\').join('//')
    // console.log(imgpath);
    // console.log(imgname);
    // console.log(Object.keys(files)[0])
    let status = -1;
    let sql = `update users set avatar ='${imgpath}' where id ='${imgname}'`;
    let conn = mysql.createConnection(dbCongif.config);
    conn.query(sql, (err, data) => {
      if (err) {
          console.log(err);
          status = 1000
        if (err.errno === 1062) {
          status = 1062;
        }
      }
    });
    conn.end();
    setTimeout(() => {
      if (status === -1) {
        res.status(200).json({ code: 200 });
      } else if (status === 1062 || status === 1000) {
        res.status(299).json({ code: 299 });
      }
    }, 50);
  });
});

module.exports = router;
