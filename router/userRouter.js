/**
 * Created by swj on 2020/8/25.
 */
const router = require('express').Router();
const db = require("./sqlHelper");
router.post("/userLogin",function(req,res){
    var user = req.body.user;
    var pwd = req.body.pwd;
    var sql = "select * from user where username = ? and pwd = ?";
    db.query(sql,[user,pwd],function(err,data){
        if(err){
            console.log(err);
            res.send({code:500,message:"数据库出错，请联系管理员"});
        }else{
            if(data.length>0){
                req.session.user = user;
                req.session.headImage = data[0].HeadImage;
                req.session.info = data[0];/*存储用户名至info中*/
                res.send({code:200,message:"登录成功",data:data});
            }else{
                res.send({code:201,message:"用户名或密码错误"});
            }
        }
    })
})
router.post("/reg",function(req,res){
    var email = req.body.Email;
    var user = req.body.user;
    var pwd = req.body.zhucePwd;
    var sql = "insert into user(username,pwd,email) values(?,?,?)";
    db.query(sql,[user,pwd,email],function(err,data){
        if(err){
            res.send("数据库出错，请联系管理员");
        }else{
            if(data.affectedRows>0){
                res.send("注册成功");
            }else{
                res.send("注册失败");
            }
        }
    })
})

module.exports = router;