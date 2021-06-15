const mysql = require('mysql')

module.exports = {
    //数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'053738',
        database:'web_final'
    },
    //连接数据库
    sqlConnect:function(sql,sqlArr,cb){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if (err) {
                console.log('连接失败')
                console.log(err);
                return ;
            }
            //事件驱动回调
            conn.query(sql,sqlArr,cb)
            //释放连接
            conn.release()
        })
    }
}
