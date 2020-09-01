/**
 * Created by swj on 2020/8/25.
 */
const mysql = require("mysql");
function DbHelper(sql,param,callback){
    const conn = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        port:3306,
        database:"shop"
    });
    conn.connect();
    conn.query(sql,param,callback);
    conn.end();
}
module.exports={
    query:DbHelper
}