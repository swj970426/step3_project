/**
 * Created by swj on 2020/8/30.
 */
const router = require("express").Router();
const db = require("./sqlHelper");
router.post("/shopcart",function(req,res){
    var rid = req.body.rid;
    if(req.session.user){
        var userId = req.session.info.id;
        //1.进行判断
        var sql2 = "select * from ShopCart where UserId=? and ruleId=?";
        db.query(sql2,[userId,rid],function(err2,data2){
            if(err2){
                console.log(err2);
            }else{
                if(data2.length>0){
                    var sql = "update ShopCart set num=num+1 where UserId=? and RuleId=?";
                    db.query(sql,[userId,rid],function(err,data){
                        if(err){
                            console.log(err);
                            res.send({code:500,message:"数据库出错，请联系管理员"})
                        }else{
                            if(data.affectedRows>0){
                                res.send({code:200,message:"加入成功"})
                            }else{
                                res.send({code:202,message:"加入失败"})
                            }
                        }
                    })
                }else{
                    var sql = "INSERT INTO ShopCart(UserId,RuleId) VALUES(?,?)";
                    db.query(sql,[userId,rid],function(err,data){
                        if(err){
                            console.log(err);
                            res.send({code:500,message:"数据库出错，请联系管理员"})
                        }else{
                            if(data.affectedRows>0){
                                res.send({code:200,message:"加入成功"})
                            }else{
                                res.send({code:202,message:"加入失败"})
                            }
                        }
                    })
                }
            }
        })
    }else{
        res.send({code:201,message:"请先登录"})
    }
})
router.post("/buildOrder",function(req,res){
    var sidStr = req.body.sidstr;
    var total = req.body.total;
    console.log(req.body.ridstr);
    /*
    * 购物车，生成订单
    * 1.生成订单
    * 订单两个表（订单表，订单详情表）
    * 先生成订单表，再生成订单详情表，最后删除购物车
    *
    * 2.删除购物车
    * */
    if(req.session.user){
        var userid = req.session.info.id;
        //1.1生成订单表
        var sql = "INSERT INTO `ORDER` (userid,total) VALUES(?,?)";
        db.query(sql,[userid,parseFloat(total)],function(err,data){
            if(err){
                res.send({code:500,message:"服务器出错"})
            }else{
                if(data.affectedRows>0){
                    var orderId = data.insertId;
                    //1.2 插入订单的详情
                    var sql2 = `INSERT INTO orderdetail(orderId,ruleId,num,price)
                     SELECT ${orderId},s.RuleId,s.num,r.price
                    FROM shopcart s JOIN productrule r
                    ON s.RuleId = r.Id
                    WHERE s.id IN (${sidStr})`;
                    db.query(sql2,[],function(err2,data2){
                        if(err2){
                            res.send({code:500,message:"服务器出错"})
                        }else{
                            //2.删除购物车信息
                            var sql3 = `delete from shopcart where id in (${sidStr})`
                            db.query(sql3,[],function(err3,data3){
                                if(err3){
                                    res.send({code:500,message:"服务器出错"})
                                }else{
                                    res.send({code:200,message:"订单生成成功，跳转到订单详情页"})
                                }
                            })
                        }
                    })
                }else{
                    res.send({code:202,message:"插入失败"})
                }
            }
        });
    }else{
        res.send({code:201,message:"请先登录"});
    }
})
module.exports = router;