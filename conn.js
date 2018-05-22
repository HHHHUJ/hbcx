//封装连接数据库

const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://47.94.153.68:27017";
// const dbName = 'hbcx';
var CONN_DB_STR = "mongodb://47.106.137.254:27017/hbcx";
// var CONN_DB_STR = "mongodb://localhost:27017/hbcx";
module.exports = {
    getDb:function(callback){
        MongoClient.connect(CONN_DB_STR,(err,db)=>{
            if(err){
                console.log('访问失败')
                callback(err,null);
            }else{
                console.log('访问成功')
                callback(null,db);
            }
        })
    }
}