var dbCongif = require('../util/dbconfig')
var mysql = require('mysql')
//获取分类
getcate = (req, res) => {
    let sql = "select * from users"
    let sqlArr = [];
    let cb = (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    }
    dbCongif.sqlConnect(sql, sqlArr, cb)
}
//注册用户
regi = (req, res) => {
    let sql = `insert into users (id,password,name,sex,email) values ('${req.body.phone}','${req.body.password}','${req.body.nickname}','${req.body.gender}','${req.body.email}')`
    let sqlArr = [];
    let cb = (err, data) => {
        if (err) {
            console.log(err)
            return false
        }
    }
    dbCongif.sqlConnect(sql, sqlArr, cb)
}


module.exports = {
    getcate,
    regi
}